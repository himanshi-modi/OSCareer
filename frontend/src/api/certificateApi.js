import api from "./axios";

export const getCertificates = (params = {}) => {
  return api.get("/certificates", {
    params,
  });
};

export const getCertificateById = (certificateId) => {
  return api.get(`/certificates/${certificateId}`);
};

export const updateCertificate = (certificateId, data) => {
  return api.patch(`/certificates/${certificateId}`, data);
};

export const deleteCertificate = (certificateId) => {
  return api.delete(`/certificates/${certificateId}`);
};