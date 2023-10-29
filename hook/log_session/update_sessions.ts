import { useEffect, useState } from "react";
import { fetchStudentList } from "../allstudents-list";




export const useStudentList = () => {
    const [students, setStudents] = useState<Student[]>();

    const fetchStudents = async () => {
        const fetchedStudents = await fetchStudentList();
        setStudents(fetchedStudents);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return { students, refetch: fetchStudents };
};

