import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import * as xlsx from "xlsx";

type Props<TData extends object> = {
  data: TData[];
  filename: string;
  title?: string;
};

function Excel<TData extends object>({ data, title, filename }: Props<TData>) {
  const template = () => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Template");
    xlsx.writeFile(workbook, `${filename}.xlsx`);
  };
  return (
    <Button onClick={() => template()}>
      <File />
      <span>{title ? title : "Export"}</span>
    </Button>
  );
}

export default Excel;
