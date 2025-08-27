import moment from 'moment';

export const common = {
  getPermissionsByName
};

function getPermissionsByName(name, responseArray) {
  const module = responseArray.find((module) => module.MenuCode == name);

  if (module) {
    return module.Permission || [];
  }
  return [];
}

export const formatCourseDates = (startDateTime, endDateTime) => {
  const startDate = moment(startDateTime).format('dddd MMMM D');
  const endDate = moment(endDateTime).format('dddd MMMM D');
  const startTime = moment(startDateTime).format('h:mm A');
  const endTime = moment(endDateTime).format('h:mm A');

  return {
    startDate,
    endDate,
    time: `${startTime} - ${endTime}`,
    date:`${startDate} - ${endDate}`
  };
};

export const formatFileSize = (bytes) => {
  if (bytes >= 1024 ** 3) {
    return (bytes / (1024 ** 3)).toFixed(2) + " GB";
  } else if (bytes >= 1024 ** 2) {
    return (bytes / (1024 ** 2)).toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else {
    return bytes + " bytes";
  }
};