<script setup lang="ts">
import api from '@/api';

import useNewMeeting from '@/store/useNewMeeting';
const {
    newMeeting,
    clearNewMeeting,
    loading,
    setLoading,
    userList,
    getUsers,
} = useNewMeeting();

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
    const hasSucces = await api.meetings.create(token, newMeeting.value);

    if (hasSucces) {
      clearNewMeeting();
      closeModal();
    }
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

const isDropdownOpen = ref(false);
const toggleDropdownAttendees = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdownOnClickOutside = (event: MouseEvent) => {
  event.preventDefault();
  const dropdown = document.querySelector('#input-attendees');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

const toggleSelectionAttendees = (attendee: string) => {
  const index = newMeeting.value.attendees.indexOf(attendee);

  if (index === -1) {
    newMeeting.value.attendees.push(attendee);
  } else {
    newMeeting.value.attendees.splice(index, 1);
  }
};

onMounted(async () => {
  document.addEventListener('click', closeDropdownOnClickOutside);
  await getUsers();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside);
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
                <label class="form-label">Participantes</label>
                <div class="input__attendees" id="input-attendees">
                  <div @click="toggleDropdownAttendees" class="input__attendees__selected-users">
                    <span v-if="newMeeting.attendees.length === 0" class="text-gray-500">Selecione...</span>
                    <span v-else>
                      <span v-for="option in newMeeting.attendees" :key="option" class="input__attendees__selected-user">
                        {{ userList[Number(option) - 1]?.name }}
                      </span>
                    </span>
                  </div>
                  <div v-if="isDropdownOpen" class="input__attendees__dropdown" id="input-attendees-dropdown">
                    <div
                      v-for="(user, index) in userList"
                      :key="index"
                      @click="toggleSelectionAttendees(`${user.id}`)"
                      class="input__attendees__dropdown__user"
                      :class="{ 'user-selected': newMeeting.attendees.includes(`${user.id}`) }"
                    >
                      {{ user.name }}
                    </div>
                  </div>
                </div>
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

<style scoped lang="scss">
  .input__attendees {
    position: relative;
    width: 100%;

    &__selected-users {
      background-color: white;
      border-radius: 6px;
      padding: 8px 16px;
      border: 1px solid var(--color-1);
      color: #222;
      box-shadow: none;
      transition: all ease-in-out 200ms;
      cursor: pointer;
    }

    &__selected-user {
      display: inline-block;
      background-color: #bfdbfe;
      padding: 0.25rem 0.5rem ;
      border-radius: 0.25rem;
      margin: 0px 0.25rem 0.25rem 0px;
    }

    &__dropdown {
      position: absolute;
      width: 100%;
      border: 1px solid #ccc;
      background-color: white;
      margin-top: 0.25rem;
      max-height: 12rem;
      overflow: auto;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

      &__user {
        padding: 0.5rem;
        margin: 8px;
        cursor: pointer;
        transition: all ease-in-out 200ms;
        border-radius: 4px;

        &:hover {
          background-color: var(--color-1);
        }
      }

      .user-selected {
        background-color: #dbeafe;

        &:hover {
          background-color: var(--color-1);
        }
      }
    }
  }
</style>