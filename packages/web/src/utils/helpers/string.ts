export const capitalize = (v: any) :string => {
  if (typeof v === 'string' && v !== '') {
    return v.charAt(0).toUpperCase() + v.slice(1);
  }
  return '';
};

export const removeProps = (props: object, unWantedPrps: string[]) : object => {
  const oldProps = props as any;
  const newProps = {} as any;
  Object.keys(props).forEach((prop:string) => {
    if (!unWantedPrps.includes(prop)) {
      newProps[prop] = oldProps[prop] as any;
    }
  });
  return newProps;
};

export const getCurrentTime = () => {
  return parseInt(String((new Date()).getTime() / 1000), 10);
}

export const isJson = (str:string | undefined) => {
  if (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  return false;
}

export const isItSmallScreen = () => {
  return window.innerWidth <= 1024;
}

export const isItLargeScreen = () => {
  return !isItSmallScreen();
}

export const uuid4 = () => {
  let d = new Date().getTime();// Timestamp
  let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;// Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16;// random number between 0 and 16
    if (d > 0) { // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else { // Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};
