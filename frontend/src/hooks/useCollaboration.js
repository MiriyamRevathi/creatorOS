import { useState, useEffect } from 'react';
import * as collabService from '../services/collaborationService';

export function useCollaboration() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pRes = await collabService.getProjects();
                const tRes = await collabService.getTasks();
                setProjects(pRes.data);
                setTasks(tRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { projects, tasks, loading };
}
