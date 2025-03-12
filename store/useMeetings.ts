import { reactive, computed } from 'vue';
// import mockMeeting from './__mockMeetings__.json';

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

const state = reactive({
    meetings: [] as MeetingType[],
});

export const useMeetings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayMeetings = computed(() => {
        return state.meetings.filter(meeting => {
            const meetingDate = new Date(meeting.start_time);
            meetingDate.setHours(0, 0, 0, 0);
            return meetingDate.getTime() === today.getTime();
        });
    });

    const pastMeetings = computed(() => {
        return state.meetings.filter(meeting => new Date(meeting.start_time) < today);
    });

    const futureMeetings = computed(() => {
        return state.meetings.filter(meeting => {
            const meetingDate = new Date(meeting.start_time);
            meetingDate.setHours(0, 0, 0, 0);
            return meetingDate.getTime() !== today.getTime() && meetingDate > today;
        });
    });

    const setMeetings = (meetings: MeetingType[]) => {
        state.meetings = meetings;
    };

    /**
     * Conta o tempo que falta para o evento e retoran uma string
     * @param date 
     * @param endDate 
     */
    const timeUntilEvent = (date: string, endDate: string): string => {
        const now = new Date();
        const eventDate = new Date(date);
        const eventEndDate = new Date(endDate);

        const timeDifference = eventDate.getTime() - now.getTime();
        const hoursDifference = Math.ceil(timeDifference / (1000 * 3600));
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Se a data do evento já passou
        if (now > eventEndDate) {
            return 'Já terminou';
        }

        // Se o evento está acontecendo agora
        if (hoursDifference <= 0) {
            return 'Em andamento';
        }

        // Contagem de horas pro evento
        if (hoursDifference < 24) {
            return `Em ${hoursDifference} horas`;
        }

        // Contagem de dias até o evento
        return `Em ${daysDifference} dias`;
    };

    return {
        state,
        todayMeetings,
        pastMeetings,
        futureMeetings,
        setMeetings,
        timeUntilEvent,
    };
};
