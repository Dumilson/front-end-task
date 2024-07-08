import { format, formatDistance, parseISO } from "date-fns";
import { pt } from "date-fns/locale";

export default function useDate() {
  function dateDifference(date: string | Date) {
    return formatDistance(date, new Date(), {
      addSuffix: true,
      locale: pt,
    });
  }

  function defaultViewDateFormat(date: Date | string) {
    if (typeof date == "string") {
      return date.split("T")[0];
    }
    return format(parseISO(date.toISOString()), "yyyy-MM-dd");
  }

  return {
    dateDifference,
    defaultViewDateFormat,
  };
}
