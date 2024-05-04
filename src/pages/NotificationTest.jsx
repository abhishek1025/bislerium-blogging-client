import React, { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';

import { Input, Button } from '@material-tailwind/react';
import {
  isNotificationGranted,
  showNotification,
  useUserAuthContext,
} from '../utils';

const NotificationTest = () => {
  const { currentUser, authToken } = useUserAuthContext();
  const hubConnection = useRef(null);

  const [message, setMessage] = useState('');
  const [connectionId, setConnectionId] = useState('');

  useEffect(() => {
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
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ', err));

    // Set up event listener
    hubConnection.current.on('ReceiveNotification', message => {
      console.log(message);
      // Function to show notification
      showNotification({
        title: 'Notification Test',
        message,
        icon: 'info',
      });
    });

    // Clean up connection when component unmounts
    return () => {
      hubConnection.current
        .stop()
        .then(() => console.log('Connection stopped'))
        .catch(err => console.error('Error while stopping connection: ', err));
    };
  }, []);

  const sendNotification = () => {
    if (
      hubConnection.current &&
      hubConnection.current.state === signalR.HubConnectionState.Connected
    ) {
      hubConnection.current
        .invoke(
          'SendNotification',
          '462aaa62-2887-4ad5-aca6-1ca189bc7344',
          'Notification Test'
        )
        .catch(err =>
          console.error("Error invoking 'SendNotification': ", err)
        );
    } else {
      console.log('Connection not established.');
    }
  };
  
  return (
    <div className='w-[300px] m-8 space-y-3'>
      NotificationText
      <Input
        onChange={e => {
          setConnectionId(e.target.value);
        }}
        label='Connection ID'
      />
      <Input
        onChange={e => {
          setMessage(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          sendNotification();
        }}>
        Send
      </Button>
    </div>
  );
};

export default NotificationTest;

