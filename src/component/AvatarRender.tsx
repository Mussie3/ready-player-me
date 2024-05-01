"use client"
import { useEffect } from 'react';
import * as S from './style';

export default function AvatarRender() {

  const subdomain = 'adlerinternal-4ba15m'; // Replace with your custom subdomain

  const frame = document.getElementById('frame');

  window.addEventListener('message', subscribe);
  document.addEventListener('message', subscribe);

  function subscribe(event: any) {
    const json = parse(event);

    if (json?.source !== 'readyplayerme') {
      return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
      if (frame) {
        const frameElement = frame as HTMLIFrameElement;
        if (frameElement.contentWindow) {
          frameElement.contentWindow.postMessage(
            JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**'
          }),
          '*'
        );
        }
      }
    }

    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
      console.log(`Avatar URL: ${json.data.url}`);
    }

    // Get user id
    if (json.eventName === 'v1.user.set') {
      console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
  }

  function parse(event: { data: string; }) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  useEffect(()=>{

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://api.readyplayer.me/v1/users`, {
          method: 'POST',
          headers: {
            'x-api-key': 'sk_live_g-QaZEfmo1VxUoGhFUU2bVL1Vse2srkGJ9KS',
          },
          body: JSON.stringify({
            'data.applicationId': '663233f150ba7737a71457aa' 
          })
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  },[])

  return (
      <>
      <S.AvatarDisplay src={`https://${subdomain}.readyplayer.me/avatar?frameApi`} id="frame" className="frame" allow="camera *; microphone *; clipboard-write"></S.AvatarDisplay>
      </>
  );
}