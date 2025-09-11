import { IconTrendingUp } from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IData {
  title: string;
  value: number;
  description: string;
}
type Props = {
  data: IData[];
  refresh?: number;
};

export function SectionCards({ data, refresh }: Props) {
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {data.map((index, key) => {
          return (
            <Card key={key} className="@container/card">
              <CardHeader>
                <CardDescription>{index.title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {index.value}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {index.description} <IconTrendingUp className="size-4" />
                </div>
              </CardFooter>
            </Card>
          );
        })}
        {refresh !== undefined && (
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Data to refresh</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {refresh}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                dede <IconTrendingUp className="size-4" />
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
