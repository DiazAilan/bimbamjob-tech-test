import { useRef } from "react";

function FileInput(props: { onFileLoaded: Function }): JSX.Element {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (files: FileList | null) => {
    const fileReader = new FileReader();
    fileReader.onload = () => props.onFileLoaded(fileReader.result);
    fileReader.readAsText(files?.[0] as File);
  };

  return (
    <input
      type="file"
      ref={fileInput}
      onChange={(event) => handleSubmit(event.target?.files)}
    />
  );
}

export default FileInput;
