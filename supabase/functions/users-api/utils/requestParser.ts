
export const parseRequest = (url: string) => {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split('/').filter(Boolean);
  const userId = pathSegments[pathSegments.length - 1];

  // Check if this is a school-specific user query
  const isSchoolUsers = pathSegments.length >= 3 && pathSegments[pathSegments.length - 3] === 'schools';
  const schoolId = isSchoolUsers ? pathSegments[pathSegments.length - 2] : null;

  return {
    userId,
    isSchoolUsers,
    schoolId,
    pathSegments
  };
};
