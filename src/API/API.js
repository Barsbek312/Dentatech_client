import axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3333",
    headers: {
        'Content-Type': 'application/json',
    }
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


export const userAPI = {
    async createUser(data) {
        let res = await instance.post("/auth/signup", data);
        return res;
    },

    async verifyEmail(token) {
        let res = await instance.post("/auth/verify-email", token)
        return res;
    },

    async login(data) {
        let res = await instance.post("/auth/signin", data);
        console.log(res);
        return res;
    },

    async getMe() {
        const token = getCookie(`token`);
        let res = await instance.get("/users/me", {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return res;
    },

    async getPositions() {
        const res = await instance.get("/auth/positions");
        return res;
    },

    async getCities() {
        const res = await instance.get('city/get-city/');
        return res;
    },

    async verify() {
        const token = getCookie(`token`);
        const res = await instance.get("/auth/verify", {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async changePassword(staffId, data) {
        const token = getCookie(`token`);
        const res = await instance.post(`/auth/change-password/${staffId}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    }
}

export const scheduleAPI = {
    async getScheduleAndPatients(staffId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/schedule/${staffId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async getClinicSchedule(clinicId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/schedule/scheduleOfClinic/${clinicId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async getScheduleType() {
        const token = getCookie(`token`);
        const res = await instance.get(`schedule/getScheduleType`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return res;
    },

    async getScheduleStatus() {
        const token = getCookie(`token`);
        const res = await instance.get(`schedule/get-schedule-status`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async addAdmission(data) {
        const token = getCookie(`token`);
        const res = await instance.post(`schedule/addAdmission`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return res;
    },

    async updateAdmission({ id, body }) {
        const token = getCookie(`token`);
        const res = await instance.patch(`schedule/updateAdmission/${id}`, body, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        return res;
    },

    async deleteReception(receptionId) {
        const token = getCookie(`token`);
        const res = await instance.delete(`schedule/delete-reception/${receptionId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    }
}

export const patientAPI = {
    async getPatient(clinicId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/patient/getPatient/${clinicId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getDistrict() {
        const token = getCookie(`token`);
        const res = await instance.get(`/patient/district`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async createPatient(data) {
        const token = getCookie(`token`);
        const res = await instance.post(`/patient/createPatient`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async updatePatient(data, id) {
        const token = getCookie(`token`);
        const res = await instance.patch(`/patient/updatePatient/${id}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getOnePatient(paitentId) {
        const token = getCookie(`token`)
        const res = await instance.get(`/patient/getOnePatient/${paitentId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res;
    },

    async getPatientStatus() {
        const token = getCookie('token')
        const res = await instance.get('/patient/getPatientStatus/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res;
    },

    async getPatientType() {
        const token = getCookie('token')
        const res = await instance.get('/patient/getPatientType/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        return res;
    },


    async getPatientSchedule(patientId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/patient/get-patient-schedule/${patientId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getStaffPatientList(staffId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/patient/get-staff-patient-list/${staffId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res;
    }
}

export const branchAPI = {
    async getBranches(clinicId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/branch/getBranches/${clinicId}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async createBranch(data) {
        const token = getCookie('token');
        const res = await instance.post('/branch/create-branch', data, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    }
}

export const personalAPI = {
    async getPersonal(clinicId) {
        const token = getCookie(`token`)
        const res = await instance.get(`/clinic/personal/${clinicId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getStaffProfile(staffId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/staff/get-staff-profile/${staffId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    }
}

export const toothAPI = {
    async getPatentToothStatus(patientId) {
        const token = getCookie(`token`)
        const res = await instance.get(`/tooth/tooth-status/${patientId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    }
}

export const diseaseAPI = {
    async getDisease(clinicId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/disease/get-disease/${clinicId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async createDisease(data) {
        const token = getCookie(`token`);
        const res = await instance.post(`/disease/create-disease`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async editDiagnosis(diagnosisId, data) {
        const token = getCookie(`token`);
        const res = await instance.patch(`/disease/edit-diagnosis/${diagnosisId}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async deleteDiagnosis(diagnosisId) {
        const token = getCookie(`token`);
        const res = await instance.delete(`/disease/delete-diagnosis/${diagnosisId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    }
}

export const procedureAPI = {
    async getProcedureType() {
        const token = getCookie(`token`);
        const res = await instance.get('/procedure/get-procedure-type', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getAllProcedure(clinicId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/procedure/get-all-procedure/${clinicId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async createProcedure(body) {
        const token = getCookie(`token`)
        const res = await instance.post("/procedure/create-procedure", body, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async createTreatmentPlan(body) {
        const token = getCookie(`token`);
        const res = await instance.post(`/procedure/create-treatment-plan`, body, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async getPatientTreatmentPlan(patientId, toothId) {
        const token = getCookie(`token`);
        const res = await instance.get(`procedure/get-treatment-plan/${patientId}/${toothId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async deletePlannedProcedure(plannedProcedureId) {
        const token = getCookie(`token`);
        const res = await instance.delete(`procedure/delete-planned-procedure/${plannedProcedureId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async editPlannedProcedure(plannedProcedureId, body) {
        const token = getCookie(`token`);
        const res = await instance.patch(`procedure/edit-planned-procedure/${plannedProcedureId}`, body, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async createCompletedProcedure(body) {
        const token = getCookie(`token`);
        const res = await instance.post(`procedure/create-completed-procedure`, body, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getCompletedProcedure(receptionId, toothId) {
        const token = getCookie('token');
        const res = await instance.get(`procedure/get-completed-procedure/${receptionId}/${toothId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async editCompletedProcedure(diseaseHistoryId, body) {
        const token = getCookie(`token`);
        const res = await instance.patch(`procedure/edit-completed-procedure/${diseaseHistoryId}`, body, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    },

    async deleteCompletedProcedure(diseaseHistoryId) {
        const token = getCookie(`token`);
        const res = await instance.delete(`procedure/delete-completed-procedure/${diseaseHistoryId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    }
}

export const billAPI = {
    async getPatientBill(patientId) {
        const token = getCookie(`token`);
        const res = await instance.get(`bill/get-patient-bill/${patientId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    }
}

export const diseaseHistoryAPI = {
    async getDiseaseHistory(patientId, toothId) {
        const token = getCookie(`token`);
        const res = await instance.get(`disease-history/get-disease-history/${patientId}/${toothId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return res;
    },

    async getDiseaseHistoryOfReception(receptionId) {
        const token = getCookie(`token`);
        const res = await instance.get(`disease-history/get-disease-history-of-reception/${receptionId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res;
    }
}

export const templateAPI = {
    async getTemplateHistory({ patientId, toothId }) {
        const token = getCookie(`token`);
        const res = await instance.get(`template/get-patient-tooth-template-history/${patientId}/${toothId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    },

    async getTemplateType() {
        const token = getCookie(`token`);
        const res = await instance.get(`template/get-template-type`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    },

    async getTemplateListByType(templateTypeId) {
        const token = getCookie(`token`);
        const res = await instance.get(`template/get-template-list-by-type/${templateTypeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    },

    async createTemplateHistory(data) {
        const token = getCookie(`token`);
        const res = await instance.post(`template/create-template-history`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    }
}