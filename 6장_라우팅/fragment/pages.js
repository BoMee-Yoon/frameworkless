export default $container => {
  const home = () => $container.textContent = 'THIS IS HOME PAGE';

  const list = () => $container.textContent = 'THIS. IS LIST PAGE';

  const notFound = () => $container.textContent = 'THIS IS NOT FOUND PAGE';
  
  return {
    home,
    list,
    notFound
  }
}