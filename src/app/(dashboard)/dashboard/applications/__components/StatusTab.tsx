import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatusTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusTabs = ({ value, onChange }: StatusTabsProps) => (
  <Tabs
    defaultValue="all"
    className="w-full sm:w-auto"
    onValueChange={onChange}
  >
    <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
      <TabsTrigger
        value="all"
        className="data-[state=active]:bg-primary data-[state=active]:text-white"
      >
        All
      </TabsTrigger>
      <TabsTrigger
        value="with-job"
        className="data-[state=active]:bg-primary data-[state=active]:text-white"
      >
        With Job
      </TabsTrigger>
      <TabsTrigger
        value="general"
        className="data-[state=active]:bg-primary data-[state=active]:text-white"
      >
        General
      </TabsTrigger>
    </TabsList>
  </Tabs>
);
