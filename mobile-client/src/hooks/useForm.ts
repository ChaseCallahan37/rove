import { useRef } from "react";
import useApi from "./useApi";

export default function useForm<T>(
  initialFormData: T,
  submitCall: (obj: T) => any
) {
  const { request: executeSubmitForm } = useApi(submitCall);

  const formData = useRef(initialFormData);

  const submitForm = async () => {
    const res = await executeSubmitForm(formData.current);

    return res;
  };

  return { formData: formData.current, submitForm };
}
