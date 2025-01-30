import { Horizon } from 'stellar-sdk';

const server = new Horizon.Server('https://horizon.stellar.org'); // Use testnet: 'https://horizon-testnet.stellar.org'

export const parse_fetch_response = async (response: any) => {
  if (response.ok) {
    return response.json();
  }
  let errorText = 'Something went wrong';
  try {
    errorText = await response.text();
  } catch(e) {}
  throw new Error(`Error code: ${response.status} : ${errorText}`);
}

export const jsonSafeParse = (str: string, defaultValue = null) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    
return defaultValue;
  }
}

export const dd = function (number: number): string {
  return number > 9 ? ('' + number) : ('0' + number)
}

// This function is deprecated.
// Instead, use dayjs
// dayjs(new Date()).format("YYYY-MM-DD")
// npm i dayjs
export const date2str = function (this_date: Date, style: number = 0 ): string {
  if ( !this_date ) return "";

  // As default, mysql date format
  let datetime: string = this_date.getFullYear() + "-"
              + dd(this_date.getMonth()+1)  + "-" 
              + dd(this_date.getDate()) + " "  
              + dd(this_date.getHours()) + ":"  
              + dd(this_date.getMinutes()) + ":" 
              + dd(this_date.getSeconds());
  if ( style === 1 ) {
    datetime = this_date.getFullYear() + "/"
              + dd(this_date.getMonth()+1)  + "/" 
              + dd(this_date.getDate()) + " "  
              + dd(this_date.getHours()) + ":"  
              + dd(this_date.getMinutes()) + ":" 
              + dd(this_date.getSeconds());
  }
  
return datetime;
}

export const getCurrentUrl = (): string => {
  let currentUrl = window.location.href;

  // Check if the last character is '/' and remove it
  if (currentUrl.endsWith('/')) {
      currentUrl = currentUrl.slice(0, -1);
  }
  
return currentUrl;
}

export const id2item = (id: string | number | null, list: Array<any>): any => {
  if(id === null) return null;
  if(!list) return null;
  for (let i = 0; i < list.length; i++) { 
    if (list[i]['id'] == id)
    {
      return list[i];
    }
  }
  
  return null;
}

export const push_non_duplicate = (value: any, list: Array<any>): void => {
  if ( !value ) { 
    return; 
  }
  for ( let i = 0; i < list.length; i++) {
    if (list[i] === value) { return; }
  }
  list.push(value);
}

export const push_non_duplicate_id = (value: any, list: Array<any>): void => {
  if ( !value?.id ) { 
    return; 
  }
  for ( let i = 0; i < list.length; i++) {
    if (list[i]?.id === value.id) { return; }
  }
  list.push(value);
}

export const capitalizeFirstLetterOfEachWord = (string: string): string => {
  if (!string) return '';
  
return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const objectToFormData = (obj: any): FormData => {
  const formData = new FormData();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  
return formData;
}

// ================================================================================================
// ================================================================================================
// BEGIN web3 settings functions
// ================================================================================================
// ================================================================================================
export const getTokenBalance = async (publicKey: string, assetCode: string, issuerAddress: string): Promise<string | null> => {
  try {
      const account = await server.loadAccount(publicKey);
      const balance = account.balances.find(
          (b: any) => b.asset_code === assetCode && b.asset_issuer === issuerAddress
      );

      if (balance) {
          console.log(`Balance of ${assetCode}: ${balance.balance}`);
          return balance.balance;
      } else {
          console.log(`No balance found for ${assetCode}`);
          return "0";
      }
  } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
  }
}