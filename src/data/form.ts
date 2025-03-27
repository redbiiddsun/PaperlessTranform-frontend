export const forms = [
    { name: 'Registration Form', date: new Date() }, // Just now
    { name: 'Survey Form', date: new Date(Date.now() - 5 * 60 * 1000) }, // 5 minutes ago
    { name: 'Feedback Form', date: new Date(Date.now() - 2 * 60 * 60 * 1000) }, // 2 hours ago
    { name: 'Job Application', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }, // 1 day ago
    { name: 'this_text_test_overflow_test', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }, // 3 days ago
  ]