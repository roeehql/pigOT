import { useEffect, useState } from "react";
import { getToday } from "@util/getToday";

const useGetTripDate = (initialdDate="latest") => {
    const [tripDate, setTripDate] = useState(initialdDate);
    const [today, setToday] = useState(getToday());

    const selectTripDate = (event : React.ChangeEvent<HTMLInputElement>) => {
        const {
          target: { value },
        } = event;
        setTripDate(value);
      };

    useEffect(() => {
        setToday(getToday());
        setTripDate(initialdDate === "latest" ? getToday() : initialdDate);
      }, []);

    return {tripDate , today , selectTripDate};
}

export default useGetTripDate