export const toISODate = (d) => d.toISOString().slice(0, 10);
export const formatDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '');
