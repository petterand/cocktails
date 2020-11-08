export default function toArray(val:any) {
   return Array.isArray(val) ? val : [val];
}
