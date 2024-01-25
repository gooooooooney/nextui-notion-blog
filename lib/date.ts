import { format } from "date-fns";
import { enUS } from "date-fns/locale/en-US";

export const dateFormat = (
  date: string | number | Date,
  formatStr = "MMM dd, yyyy"
) => {
  return format(date, formatStr, {
    locale: enUS,
  });
};
