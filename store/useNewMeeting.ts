import api from '@/api';
import { ref } from 'vue';

interface User {
    id: number | null;
    name: string | null,
}

export default function useNewMeeting() {
    const emptyNewMeeting = {
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        meeting_link: '',
        attendees: [],
    };
    
    const newMeeting = ref<NewMeetingType>({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        meeting_link: '',
        attendees: []
    });

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