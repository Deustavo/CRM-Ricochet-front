<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api';

const newMeeting = ref({
    title: 'teste',
    description: 'aaa',
    start_time: '2025-03-12T20:00:00',
    end_time: '2025-03-12T21:00:00',
    meeting_link: 'https://gatry.com/',
    attendees: ["1"],
});

const loading = ref(false);
const setLoading = (value: boolean) => {
    loading.value = value;
};

const closeModal = () => {
  const closeButton = document.getElementById('close');
  const activeElement = document.activeElement as HTMLElement;

  if (activeElement) {
    activeElement.blur();
  }

  if (closeButton) {
    closeButton.click();
  }
};

const createMeeting = async () => {
  setLoading(true);
  const token = sessionStorage.getItem('@token');
  
  if (token) {
    await api.meetings.create(token, newMeeting.value);
    closeModal();
  }

  setLoading(false);
};

const hasEmptyField = computed(() => {
  return (
    !newMeeting.value.title ||
    !newMeeting.value.description ||
    !newMeeting.value.start_time ||
    !newMeeting.value.end_time ||
    !newMeeting.value.meeting_link ||
    newMeeting.value.attendees.length === 0
  );
});

const isValidDate = computed(() => {
  const start = new Date(newMeeting.value.start_time);
  const end = new Date(newMeeting.value.end_time);

  return start < end;
});

const isDisabled = computed(() => {
    return (
      hasEmptyField.value ||
      !isValidDate.value ||
      loading.value
    );
});
</script>

<template>
  <div class="modal fade" id="newMeetingModal" tabindex="-1" aria-labelledby="newMeetingModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="newMeetingModalLabel">Agendar nova reunião</h5>
          <button type="button" id="close" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form>
              <div class="input__container">
                <label for="meetingTitle" class="form-label">Titulo da reunião</label>
                <input type="text" class="form-control" id="meetingTitle" v-model="newMeeting.title" :disabled="loading">
              </div>

              <div class="input__container">
                <label for="meetingDescription" class="form-label">Descrição</label>
                <textarea class="form-control" id="meetingDescription" v-model="newMeeting.description" :disabled="loading"></textarea>
              </div>
              
              <div class="input__container">
                <label for="meetingStartTime" class="form-label">Inicio</label>
                <input type="datetime-local" class="form-control" id="meetingStartTime" v-model="newMeeting.start_time" :disabled="loading">
              </div>
              
              <div class="input__container mb-2">
                <label for="meetingEndTime" class="form-label">Fim</label>
                <input type="datetime-local" class="form-control" id="meetingEndTime" v-model="newMeeting.end_time" :disabled="loading">
                <p v-if="!isValidDate" class="text-danger">O fim da reunião deve ser depois do inicio</p>
                <p v-else class="mb-4"></p>
              </div>
              
              <div class="input__container">
                <label for="meetingLink" class="form-label">Link da reunião</label>
                <input type="url" class="form-control" id="meetingLink" v-model="newMeeting.meeting_link" :disabled="loading">
              </div>

              <div class="input__container">
                <label for="meetingAttendees" class="form-label">Participantes</label>
                <input type="text" class="form-control" id="meetingAttendees" v-model="newMeeting.attendees" :disabled="loading">
              </div>
            </form>
        </div>
        <div class="modal-footer">
          <div class="d-flex">
            <!-- <button class="button--2 me-3" data-bs-dismiss="modal">Close</button> -->
            <button
              @click="createMeeting"
              class="button--1"
              :disabled="isDisabled"
            >
              <i
                v-if="loading"
                class="pi pi-spin pi-spinner"
                style="min-width: 92px;"
              />
              <span v-else>Criar reunião</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


