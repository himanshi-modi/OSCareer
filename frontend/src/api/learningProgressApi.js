import api from "./axios";


export const getUserStages = async () => {
  const response = await api.get(
    "/learning-progress/stages"
  );

  return response.data;
};

export const getStageDetails = async (stageId) => {
  const response = await api.get(
    `/learning-progress/stages/${stageId}`
  );

  return response.data;
};

export const getStageMissions = async (stageId) => {
  const response = await api.get(`/learning-progress/stages/${stageId}/missions` );
  return response.data;
};

export const getMissionDetails = async (missionId) => {
  
  const response = await api.get(
    `/learning-progress/missions/${missionId}`
  );

  return response.data;
};

export const startMission = async (missionId) => {
  const response = await api.post(`/learning-progress/missions/${missionId}/start`);
  return response.data;
};


export const completeMission = async (missionId) => {
  const response = await api.post( `/learning-progress/missions/${missionId}/complete`);

  return response.data;
};

export const submitMissionProof = async ( missionId,proofData) => {
  const response = await api.post( `/learning-progress/missions/${missionId}/proof`,
    {
      proof: proofData,
    }
  );

  return response.data;
};

export const skipMission = async (
  missionId,
  skipReason
) => {
  const response = await api.patch(
    `/learning-progress/missions/${missionId}/skip`,
    {
      skipReason,
    }
  );

  return response.data;
};

// ============================================================
// REVIEW MISSION PROOF
// ============================================================

export const reviewMissionProof = async (
  missionProgressId,
  decision,
  feedback = ""
) => {
  const response = await api.patch(
    `/learning-progress/mission-progress/${missionProgressId}/proof/review`,
    {
      decision,
      feedback,
    }
  );

  return response.data;
};