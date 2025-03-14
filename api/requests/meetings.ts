import { toast } from "vue3-toastify";

import { useMeetings } from "@/store/useMeetings";
const { setMeetings } = useMeetings();

import { useSession } from "@/store/useSession";
const { user } = useSession();

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

const getAll = async () => {
    const userId = user.value.id;
    const path = `http://localhost:8000/api/meetings/user/${userId}`;

    try {
        const data: MeetingType[] = await $fetch(path, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('@token')}`,
            },
        });

        setMeetings(data);
    } catch (error) {
        toast.error('Houve um erro ao buscar as reuniões!');
    }
}

declare global {
    interface NewMeetingType {
        title: string;
        description: string;
        start_time: string;
        end_time: string;
        meeting_link: string;
        attendees: string[];
    }
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

        getAll();
        toast.success('Reunião criada com sucesso!');
        return true;
    } catch (error) {
        toast.error('Houve um erro ao criar a reunião!');
        return false;
    }
}

export default {
    getAll,
    create
};
