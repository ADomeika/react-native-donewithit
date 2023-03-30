import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";

export default function FormImagePicker({ name }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();
    const images = values[name];

    const handleAdd = (image) => {
        setFieldValue(name, [...images, image]);
    };

    const handleRemove = (uri) => {
        setFieldValue(
            name,
            images.filter((image) => image.assets !== uri)
        );
    };

    return (
        <>
            <ImageInputList
                images={images}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}
