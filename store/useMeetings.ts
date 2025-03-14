import { reactive, computed } from 'vue';

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

interface BadgeTimeUntilEventType {
    status: number;
    text: string;
}

const state = reactive({
    meetings: [] as MeetingType[],
});

const eventStatus = {
    PENDING: 1,
    IN_PROGRESS: 2,
    FINISHED: 3, 
}

const badgeClasses = {
    [eventStatus.PENDING]: 'bg-secondary',
    [eventStatus.IN_PROGRESS]: 'bg-primary',
    [eventStatus.FINISHED]: 'bg-dark',
}

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
     * Conta o tempo que falta para o evento e retoram um objeto com o status e o texto
     * @param date 
     * @param endDate 
     */
    const badgeTimeUntilEvent = (date: string, endDate: string): BadgeTimeUntilEventType => {
        const now = new Date();
        const eventDate = new Date(date);
        const eventEndDate = new Date(endDate);

        const timeDifference = eventDate.getTime() - now.getTime();
        const hoursDifference = Math.ceil(timeDifference / (1000 * 3600));
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Se a data do evento já passou
        if (now > eventEndDate) {
            return {
                status: eventStatus.FINISHED,
                text: 'Já terminou',
            };
        }

        // Se o evento está acontecendo agora
        if (hoursDifference <= 0) {
            return {
                status: eventStatus.IN_PROGRESS,
                text: 'Em andamento',
            };
        }

        // Contagem de horas pro evento
        if (hoursDifference < 24) {
            return {
                status: eventStatus.PENDING,
                text: `Em ${hoursDifference} horas`,
            };
        }

        // Contagem de dias até o evento
        return {
            status: eventStatus.PENDING,
            text: `Em ${daysDifference} dias`,
        };
    };

    const badgeTimeUntilEventText = (meeting: { start_time: string, end_time: string }) => {
        return badgeTimeUntilEvent(meeting.start_time, meeting.end_time).text;
    };

    const badgeTimeUntilEventClass = (meeting: { start_time: string, end_time: string }) => {
        const status = badgeTimeUntilEvent(meeting.start_time, meeting.end_time).status;
        return badgeClasses[status];
    };

    return {
        state,
        todayMeetings,
        pastMeetings,
        futureMeetings,
        setMeetings,
        badgeTimeUntilEventText,
        badgeTimeUntilEventClass,
    };
};
