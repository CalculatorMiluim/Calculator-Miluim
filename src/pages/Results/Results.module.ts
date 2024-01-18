import {useGetResultsMutation} from "@/features/results/resultsApiSlice.ts";
import {useEffect} from "react";

export const useResults = () => {
    const [getResults] = useGetResultsMutation()

    useEffect(() => {

        const res = getResults({
            combat_level: "a",
            family_status: {
                employment_status: "asdf",
                active_reservist: false,
                business_size: "asdf",
                property_owner: true
            },
            recruitment_date: [],
            recruitment_type: "sadf"
        })

        console.log(res)
    }, []);
}