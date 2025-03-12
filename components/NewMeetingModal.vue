<script setup lang="ts">
import { ref } from 'vue';

const newMeeting = ref({
  title: '',
  date: '',
  location: '',
  link: '',
  endDate: ''
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
              <label for="meetingDate" class="form-label">Inicio</label>
              <input type="datetime-local" class="form-control" id="meetingDate" v-model="newMeeting.date">
            </div>

            <div class="mb-3">
              <label for="meetingEndDate" class="form-label">Fim</label>
              <input type="datetime-local" class="form-control" id="meetingEndDate" v-model="newMeeting.endDate">
            </div>

            <div class="mb-3">
              <label for="meetingLocation" class="form-label">Local (opicional)</label>
              <input type="text" class="form-control" id="meetingLocation" v-model="newMeeting.location">
            </div>

            <div class="mb-3">
              <label for="meetingLink" class="form-label">Link (opicional)</label>
              <input type="url" class="form-control" id="meetingLink" v-model="newMeeting.link">
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


