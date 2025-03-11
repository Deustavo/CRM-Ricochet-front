import { reactive, computed } from 'vue';
import mockMeeting from './__mockMeetings__.json'

interface Meeting {
    id: number;
    title: string;
    date: string;
    location: string;
    link: string;
}

const state = reactive({
    meetings: mockMeeting as Meeting[],
});

export const useMeetings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayMeetings = computed(() => {
        return state.meetings.filter(meeting => {
            const meetingDate = new Date(meeting.date);
            meetingDate.setHours(0, 0, 0, 0);
            return meetingDate.getTime() === today.getTime();
        });
    });

    const pastMeetings = computed(() => {
        return state.meetings.filter(meeting => new Date(meeting.date) < today);
    });

    const futureMeetings = computed(() => {
        return state.meetings.filter(meeting => new Date(meeting.date) > today);
    });

    const addMeeting = (meeting: Meeting) => {
        state.meetings.push(meeting);
    };

    return {
        state,
        todayMeetings,
        pastMeetings,
        futureMeetings,
        addMeeting,
    };
};
