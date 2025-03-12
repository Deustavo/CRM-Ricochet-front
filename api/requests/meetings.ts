import { toast } from "vue3-toastify";

import { useMeetings } from "@/store/useMeetings";
const { setMeetings } = useMeetings();

interface MeetingType {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    attendees: AttendeesType[];
}

type AttendeesType = {
    id: number;
    name: string;
    email: string;
}

const getAll = async (token: string) => {
    try {
        const data: MeetingType[] = await $fetch('http://localhost:8000/api/meetings', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setMeetings(data);
    } catch (error) {
        toast.error('Houve um erro ao buscar as reuniões!');
    }
}

interface NewMeetingType {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    attendees: string[];
}

const create = async (token: string, body: NewMeetingType) => {
    try {
        await $fetch('http://localhost:8000/api/meetings', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });

        getAll(token);
        toast.success('Reunião criada com sucesso!');
    } catch (error) {
        toast.error('Houve um erro ao criar a reunião!');
    }
}

export default {
    getAll,
    create
};
