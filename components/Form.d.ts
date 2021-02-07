export default Form;
declare function Form(props: any): JSX.Element;
declare namespace Form {
    export { FormField as Field };
    export { FormButton as Button };
    export { FormErrorMessage as ErrorMessage };
    export { FormSwitch as Switch };
}
import FormField from "./Forms/FormField";
import FormButton from "./Forms/FormButton";
import FormErrorMessage from "./Forms/FormErrorMessage";
import FormSwitch from "./Forms/FormSwitch";
