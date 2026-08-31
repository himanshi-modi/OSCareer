import api from "./axios";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await api.post("/resumes", formData);
};



export const getAllResumes = async () => {
    return await api.get("/resumes");
};

export const getCurrentResume = async () => {
    return await api.get("/resumes/current");
};

export const getResumeById = async (resumeId) => {
    return await api.get(`/resumes/${resumeId}`);
};

export const setCurrentResume = async (resumeId) => {
    return await api.patch(
        `/resumes/${resumeId}/set-current`
    );
};

export const deleteResume = async (resumeId) => {
    return await api.delete(
        `/resumes/${resumeId}`
    );
};

export const startResumeAnalysis = async (resumeId) => {
  return await api.post(`/resumes/${resumeId}/analyze`);
};


export const getLatestResumeAnalysis = async (resumeId) => {
    return await api.get(
        `/resumes/${resumeId}/analysis/current`
    );
};

export const getAnalysisHistory = async (resumeId) => {
    return await api.get(
        `/resumes/${resumeId}/analysis/history`
    );
};

export const getSpecificResumeAnalysis = async (
    resumeId,
    analysisId
) => {
    return await api.get(
        `/resumes/${resumeId}/analysis/${analysisId}`
    );
};

export const getAllResumeAnalyses = async (resumeId) => {
    return await api.get(
        `/resumes/${resumeId}/analysis`
    );
};

export const deleteResumeAnalysis = async (
    resumeId,
    analysisId
) => {
    return await api.delete(
        `/resumes/${resumeId}/analysis/${analysisId}`
    );
};