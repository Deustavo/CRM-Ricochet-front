<script setup lang="ts">
import { ref } from 'vue';

export interface MeetingType {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    attendees: [];
}

const newMeeting = ref({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    meeting_link: '',
    attendees: [],
});
</script>

<template>
  <div class="modal fade" id="newMeetingModal" tabindex="-1" aria-labelledby="newMeetingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="newMeetingModalLabel">Agendar nova reunião</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="meetingTitle" class="form-label">Titulo da reunião</label>
                <input type="text" class="form-control" id="meetingTitle" v-model="newMeeting.title">
              </div>

              <div class="mb-3">
                <label for="meetingDescription" class="form-label">Descrição</label>
                <textarea class="form-control" id="meetingDescription" v-model="newMeeting.description"></textarea>
              </div>

              <div class="mb-3">
                <label for="meetingStartTime" class="form-label">Inicio</label>
                <input type="datetime-local" class="form-control" id="meetingStartTime" v-model="newMeeting.start_time">
              </div>

              <div class="mb-3">
                <label for="meetingEndTime" class="form-label">Fim</label>
                <input type="datetime-local" class="form-control" id="meetingEndTime" v-model="newMeeting.end_time">
              </div>

              <div class="mb-3">
                <label for="meetingLink" class="form-label">Link da reunião</label>
                <input type="url" class="form-control" id="meetingLink" v-model="newMeeting.meeting_link">
              </div>

              <div class="mb-3">
                <label for="meetingAttendees" class="form-label">Participantes</label>
                <input type="text" class="form-control" id="meetingAttendees" v-model="newMeeting.attendees">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <div class="d-flex">
            <button class="button--2 me-3" data-bs-dismiss="modal">Close</button>
            <button class="button--1">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


