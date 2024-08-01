import cl from "./label.module.scss";

const labelTypes: string[] = ["NEW", "ХИТ"];

type TLabel = {
  labelType?: number | undefined;
};

const Label = ({ labelType }: TLabel) => {
  if (!labelType) return null;

  return (
    <div>
      {typeof labelType === "number" && (
        <div className={`mini ${cl.label}`}>{labelTypes[labelType]}</div>
      )}
    </div>
  );
};

export default Label;
