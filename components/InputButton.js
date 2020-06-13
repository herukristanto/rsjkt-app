import React from "react";
import { Button } from "@ui-kitten/components";
import { useFormikContext } from "formik";

const InputButton = ({ label, ...props }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <React.Fragment>
      <Button {...props} onPress={() => handleSubmit()} disabled={isSubmitting}>
        {label}
      </Button>
    </React.Fragment>
  );
};

export default InputButton;
