import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionToggle,
  AccordionContent,
  Checkbox,
  Radio,
  Button,
} from "@strapi/design-system";
import { Stack } from "@strapi/design-system/Stack";
import { Loader } from "@strapi/design-system/Loader";
import { request } from "@strapi/helper-plugin";
import { useParams } from "react-router-dom";
import { useFormikContext } from "formik";

const ProductAttributesHelper = () => {
  const { id: productId } = useParams();
  const { setFieldValue, values } = useFormikContext();
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  // Fetch all attributes
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const { data } = await request("/api/attributes", {
          method: "GET",
          params: {
            populate: "attributeValues",
            locale: "en",
            pagination: { pageSize: 100 },
          },
        });

        // Group attributes by category
        const groupedAttributes = data.reduce((acc, attr) => {
          if (!acc[attr.attributes.category]) {
            acc[attr.attributes.category] = [];
          }
          acc[attr.attributes.category].push({
            id: attr.id,
            ...attr.attributes,
            attributeValues: attr.attributes.attributeValues.data.map((v) => ({
              id: v.id,
              ...v.attributes,
            })),
          });
          return acc;
        }, {});

        setAttributes(groupedAttributes);
        setLoading(false);

        // Initialize from current product data
        if (values.attributes) {
          setSelectedAttributes(values.attributes.map((attr) => attr.id));
        }

        if (values.attributeValues) {
          setSelectedValues(values.attributeValues.map((val) => val.id));
        }
      } catch (error) {
        console.error("Error fetching attributes:", error);
        setLoading(false);
      }
    };

    fetchAttributes();
  }, [productId]);

  const handleToggleCategory = (category) => {
    setExpanded({
      ...expanded,
      [category]: !expanded[category],
    });
  };

  const handleAttributeChange = (attributeId, checked) => {
    let newSelectedAttributes = [...selectedAttributes];

    if (checked) {
      newSelectedAttributes.push(attributeId);
    } else {
      // Remove attribute and its values
      newSelectedAttributes = newSelectedAttributes.filter(
        (id) => id !== attributeId,
      );

      // Find attribute to get its values
      let attrValues = [];
      Object.values(attributes).forEach((categoryAttrs) => {
        categoryAttrs.forEach((attr) => {
          if (attr.id === attributeId) {
            attrValues = attr.attributeValues.map((v) => v.id);
          }
        });
      });

      // Remove all values for this attribute
      const newSelectedValues = selectedValues.filter(
        (id) => !attrValues.includes(id),
      );
      setSelectedValues(newSelectedValues);
      setFieldValue(
        "attributeValues",
        newSelectedValues.map((id) => ({ id })),
      );
    }

    setSelectedAttributes(newSelectedAttributes);
    setFieldValue(
      "attributes",
      newSelectedAttributes.map((id) => ({ id })),
    );
  };

  const handleValueChange = (attributeId, valueId, isMulti) => {
    let newSelectedValues = [...selectedValues];

    // Make sure the attribute is selected
    if (!selectedAttributes.includes(attributeId)) {
      const newSelectedAttributes = [...selectedAttributes, attributeId];
      setSelectedAttributes(newSelectedAttributes);
      setFieldValue(
        "attributes",
        newSelectedAttributes.map((id) => ({ id })),
      );
    }

    if (isMulti) {
      // For multi-select (checkboxes)
      if (newSelectedValues.includes(valueId)) {
        newSelectedValues = newSelectedValues.filter((id) => id !== valueId);
      } else {
        newSelectedValues.push(valueId);
      }
    } else {
      // For single-select (radio buttons)
      // Find all values for this attribute
      let attrValues = [];
      Object.values(attributes).forEach((categoryAttrs) => {
        categoryAttrs.forEach((attr) => {
          if (attr.id === attributeId) {
            attrValues = attr.attributeValues.map((v) => v.id);
          }
        });
      });

      // Remove any existing values for this attribute
      newSelectedValues = newSelectedValues.filter(
        (id) => !attrValues.includes(id),
      );
      // Add the new value
      newSelectedValues.push(valueId);
    }

    setSelectedValues(newSelectedValues);
    setFieldValue(
      "attributeValues",
      newSelectedValues.map((id) => ({ id })),
    );
  };

  const isValueSelected = (valueId) => {
    return selectedValues.includes(valueId);
  };

  if (loading) {
    return (
      <Box padding={4} background="neutral100">
        <Loader>Loading attributes...</Loader>
      </Box>
    );
  }

  return (
    <Box padding={4} background="neutral100" shadow="filterShadow" hasRadius>
      <Typography variant="delta">Product Attributes Helper</Typography>
      <Typography variant="omega" fontStyle="italic">
        Select attributes and values in English
      </Typography>

      {Object.entries(attributes).map(([category, categoryAttributes]) => (
        <Accordion
          key={category}
          expanded={expanded[category] || false}
          onToggle={() => handleToggleCategory(category)}
          id={`category-${category}`}
        >
          <AccordionToggle title={category} />
          <AccordionContent>
            <Stack spacing={4}>
              {categoryAttributes.map((attribute) => (
                <Box
                  key={attribute.id}
                  padding={2}
                  background="neutral0"
                  hasRadius
                >
                  <Box paddingBottom={2}>
                    <Checkbox
                      name={`attribute-${attribute.id}`}
                      value={attribute.id}
                      onValueChange={(checked) =>
                        handleAttributeChange(attribute.id, checked)
                      }
                      checked={selectedAttributes.includes(attribute.id)}
                    >
                      <Typography fontWeight="bold">
                        {attribute.label}
                      </Typography>
                    </Checkbox>
                  </Box>

                  <Box padding={2} paddingLeft={4}>
                    {attribute.attributeValues &&
                      attribute.attributeValues.map((value) => (
                        <Box key={value.id} padding={1}>
                          {attribute.selectionType === "multi" ? (
                            <Checkbox
                              name={`value-${value.id}`}
                              value={value.id}
                              onValueChange={(checked) =>
                                handleValueChange(attribute.id, value.id, true)
                              }
                              checked={isValueSelected(value.id)}
                            >
                              {value.label}
                            </Checkbox>
                          ) : (
                            <Radio
                              name={`attribute-${attribute.id}-value`}
                              value={value.id}
                              onValueChange={() =>
                                handleValueChange(attribute.id, value.id, false)
                              }
                              checked={isValueSelected(value.id)}
                            >
                              {value.label}
                            </Radio>
                          )}
                        </Box>
                      ))}
                  </Box>
                </Box>
              ))}
            </Stack>
          </AccordionContent>
        </Accordion>
      ))}
    </Box>
  );
};

export default ProductAttributesHelper;
