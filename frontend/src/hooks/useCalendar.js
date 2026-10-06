import { useState, useEffect } from 'react';
import * as calendarService from '../services/calendarService';

export function useCalendar() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const res = await calendarService.getCalendars();
            setEvents(res.data);
        } catch (error) {
            console.error('Error fetching calendar', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const addEvent = async (data) => {
        await calendarService.createCalendar(data);
        fetchEvents();
    };

    return { events, loading, addEvent };
}
