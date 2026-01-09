// 'use client'
// import { useState, useEffect } from 'react';
// import { Search, Users } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { TabsContent } from '@/components/ui/tabs';
// import AdminNavbar from '@/components/admin-navbar';

// const UsersPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   // Fetch users from API or receive as props (implement as needed)
//   useEffect(() => {
//     // Example: fetch('/api/users').then(res => res.json()).then(data => setUsers(data));
//   }, []);

//   // Filter users based on search term
//   useEffect(() => {
//     const filtered = users.filter(
//       (user) =>
//         user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [searchTerm, users]);

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="mt-6">
//         <Card>
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>User Management</CardTitle>
//                 <CardDescription>View and manage registered users</CardDescription>
//               </div>
//               <div className="relative">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search users..."
//                   className="pl-10 w-64"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {filteredUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                 >
//                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
//                     <Users className="w-6 h-6 text-primary" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold">{user.fullName}</h3>
//                     <p className="text-sm text-muted-foreground">{user.email}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {user.location && `${user.location} • `}
//                       Joined {new Date(user.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <Badge variant={user.isVerified ? 'default' : 'secondary'}>
//                       {user.isVerified ? 'Verified' : 'Pending'}
//                     </Badge>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       {user.enrolledCourses?.length || 0} courses
//                     </p>
//                     {user.credits > 0 && (
//                       <p className="text-sm text-green-600 mt-1">
//                         ₹{user.credits} credits
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//               {filteredUsers.length === 0 && (
//                 <div className="text-center py-8 text-muted-foreground">
//                   <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                   <p>No users found.</p>
//                   {searchTerm && (
//                     <p className="text-sm">Try adjusting your search criteria.</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default UsersPage;

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import AdminNavbar from '@/components/admin-navbar';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${document.cookie.split('auth-token=')[1]?.split(';')[0]}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
      } else {
        toast.error('Failed to load users data');
      }
    } catch (error) {
      console.error('Error fetching users data:', error);
      toast.error('Error loading users data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              View and manage registered users
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Registered Users</CardTitle>
                    <CardDescription>
                      List of all platform users
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.fullName}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.location && `${user.location} • `}
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={user.isVerified ? 'default' : 'secondary'}
                        >
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {user.enrolledCourses?.length || 0} courses
                        </p>
                        {user.credits > 0 && (
                          <p className="text-sm text-green-600 mt-1">
                            ₹{user.credits} credits
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No users found.</p>
                      {searchTerm && (
                        <p className="text-sm">Try adjusting your search criteria.</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;