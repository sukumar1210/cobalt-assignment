'use client'
import Image from "next/image";

export default function Home() {
  function oauthSignIn() {
    console.log('executing');
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);
  
    // Parameters to pass to OAuth 2.0 endpoint.
    var params: any = {'client_id': '153440707501-s402gi9og0g706733h2nlvj093fmegia.apps.googleusercontent.com',
                  'redirect_uri': 'http://localhost:3000/auth/callback/google',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
                  'include_granted_scopes': 'true',
                  'state': 'pass-through value',
                  'prompt': 'consent',
                };
  
    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }
  
    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  return (
    <button onClick={oauthSignIn} className="border-[1px]">propose</button>
  );
}
