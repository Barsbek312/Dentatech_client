import axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3333",
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
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

    async verify() {
        const token = getCookie(`token`);
        const res = await instance.get("/auth/verify", {
            headers: {'Authorization': `Bearer ${token}`}
        });
        return res;
    }
}

export const scheduleAPI = {
    async getScheduleAndPatients(staffId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/schedule/${staffId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        return res;
    },

    async getStatusSchedule() {
        const token = getCookie(`token`);
        const res = await instance.get(`schedule/getStatus`, {
            headers: {'Authorization': `Bearer ${token}`}
        });

        return res;
    },

    async addAdmission(data) {
        const token = getCookie(`token`);
        const res = await instance.post(`schedule/addAdmission`, data, {
            headers: {'Authorization': `Bearer ${token}`}
        });

        return res;
    }
}

export const patientAPI = {
    async getPatient(branchId) {
        const token = getCookie(`token`);
        const res = await instance.get(`/patient/getPatient/${branchId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        return res;
    },

    async getDistrict() {
        const token = getCookie(`token`);
        const res = await instance.get(`/patient/district`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        return res;
    },

    async createPatient(data) {
        const token = getCookie(`token`);
        const res = await instance.post(`/patient/createPatient`, data, {
            headers: {'Authorization': `Bearer ${token}`}
        });
        return res;
    }
}
