import api from '@/api';
import { ref } from 'vue';

interface User {
    id: number | null;
    name: string | null,
}

export default function useNewMeeting() {
    const emptyNewMeeting = {
        title: 'teste',
        description: 'aaa',
        start_time: '2025-03-12T20:00:00',
        end_time: '2025-03-12T21:00:00',
        meeting_link: 'https://gatry.com/',
        attendees: ["1"],
    };
    
    const newMeeting = ref(emptyNewMeeting);
    const clearNewMeeting = () => {
        newMeeting.value = emptyNewMeeting;
    };
    
    const loading = ref(false);
    const setLoading = (value: boolean) => {
        loading.value = value;
    };
    
    const userList = ref<User[]>([]);
    const getUsers = async () => {
        userList.value = (await api.user.getAllUsers()) || [];
    };

    return {
        newMeeting,
        clearNewMeeting,
        loading,
        setLoading,
        userList,
        getUsers,
    };
}