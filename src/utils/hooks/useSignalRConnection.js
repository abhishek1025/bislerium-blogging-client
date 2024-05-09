import { useRef, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import useUserAuthContext from './useUserAuthContext';
import { getAuthTokenFromCookie } from '../handleCookies';
import { showNotification } from '../alerts';
import { toast } from 'react-toastify';

const useSignalRConnection = () => {
  const hubConnection = useRef(null);
  const authToken = getAuthTokenFromCookie();
  const { currentUser } = useUserAuthContext();

  useEffect(() => {
    if (!authToken) {
      console.log('User not logged in. SignalR connection not started.');
      return;
    }

    // Initialize the SignalR connection
    hubConnection.current = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7180/notification', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => authToken,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Start the connection
    hubConnection.current
      .start()
      .then(() => {
        console.log('Connection started');
      })
      .catch(err => console.error('Error while starting connection: ', err));

    // Subscribe to server-side events
    hubConnection.current.on('ReceiveNotification', receivedMessage => {
      toast.info(receivedMessage);
    });

    // Clean up the connection when the hook unmounts
    return () => {
      hubConnection.current
        .stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.error('Error while stopping connection: ', err));
    };
  }, [authToken]); // Dependency array ensures connection is refreshed when authToken changes

  const sendNotification = ({ userId, message }) => {
    if (
      hubConnection.current &&
      hubConnection.current.state === signalR.HubConnectionState.Connected
    ) {
      hubConnection.current
        .invoke('SendNotification', userId, message)
        .catch(err =>
          console.error("Error invoking 'SendNotification': ", err)
        );
    } else {
      console.error('Connection not established.');
    }
  };

  return { sendNotification };
};
export default useSignalRConnection;

