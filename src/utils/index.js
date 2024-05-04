import { toast } from 'react-toastify';
import { SERVER_URL } from '../config';
export * from './alerts';
export * from './api';
export * as apiHandler from './api';
export * from './handleCookies';
export * from './hooks';

export const hasUserVoted = (votes = [], userID) => {
  const userVote = votes.find(vote => vote.user === userID);

  return userVote ? userVote.votingStatus : '';
};

export const formatImageUrl = url => {
  if (!url) {
    return;
  }

  if (url.startsWith('https://')) {
    return url;
  }

  return `${SERVER_URL}/${url}`;
};

export const formatViews = views => {
  const viewsCount = views.length;

  return viewsCount > 1000 ? viewsCount / 1000 : viewsCount;
};

export const showUnauthorizedAccessToast =
  ({ navigate, path, currentUser, allowedRoles = ['mentor', 'admin'] }) =>
  () => {
    if (allowedRoles.includes(currentUser?.role)) {
      navigate(path);
      return;
    }

    toast.warning('You do not have permission to access this feature.', {
      theme: 'dark',
    });
  };

export const formatDataForDashboardChart = items => {
  return {
    labels: items.map(({ month }) => month),
    data: items.map(({ count }) => count),
  };
};

export const fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Extract base64 part after the comma
      resolve(base64String);
    };

    reader.onerror = error => {
      reject(error);
    };
  });
};

export const base64ToImage = base64 => {
  if (!base64) {
    return 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
  }

  return `data:image/;base64,${base64}`;
};

export const formatErrorMessage = response => {
  if (response?.errors) {
    return Object.values(response.errors)[0][0];
  }

  return response.message;
};

export const askNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  return permission;
};

export const isNotificationGranted = () => {
  return Notification.permission === 'granted';
};

