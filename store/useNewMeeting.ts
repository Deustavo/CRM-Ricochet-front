import api from '@/api';
import { ref } from 'vue';

interface User {
    id: number | null;
    name: string | null,
}

export default function useNewMeeting() {
    const now = new Date();
    const startTimeSugestion = new Date(now.getTime() + (7 - 180) * 60000).toISOString().slice(0, 16);
    const endTimeSugestion = new Date(now.getTime() + (30 + 7 - 180) * 60000).toISOString().slice(0, 16);
    
    const emptyNewMeeting = {
        title: '',
        description: '',
        start_time: startTimeSugestion,
        end_time: endTimeSugestion,
        meeting_link: '',
        attendees: [],
    };

    const newMeeting = ref<NewMeetingType>({
        title: 'Mock Meeting Title',
        description: 'This is a mock description for the meeting.',
        start_time: startTimeSugestion,
        end_time: endTimeSugestion,
        meeting_link: 'https://mock-meeting-link.com',
        attendees: ['1', '2']
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

    const calculateTimeRemaining = (startTime: string) => {
        const now = new Date();
        const start = new Date(startTime);
        const diffInMs = start.getTime() - now.getTime();
        const diffInMinutes = Math.floor(diffInMs / 60000);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes remaining`;
        } else {
            const hours = Math.floor(diffInMinutes / 60);
            const minutes = diffInMinutes % 60;
            return `${hours} hours and ${minutes} minutes remaining`;
        }
    };

    return {
        newMeeting,
        clearNewMeeting,
        loading,
        setLoading,
        userList,
        getUsers,
        calculateTimeRemaining,
    };
}