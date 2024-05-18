'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, deleteContact } from '../utils/contact';
import { setContacts } from '../app/contacts';
import { useRouter } from 'next/navigation';
import { RootState } from '../app/store';

interface Contact {
    id: number;
    name: string;
    email: string;
    reason: string;
    statement: string; 
    subComments?: Contact[]; 
  }

 const Contact1: React.FC = () => {

   
  const router = useRouter();

  const dispatch = useDispatch();
  const contacts: Contact[] = useSelector((state:any) => state.contacts);
  const user = useSelector((state: RootState) => state.user); 
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [expandedContacts, setExpandedContacts] = useState<number[]>([]);
  const [contactCount, setContactCount] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/Sign_In');
    } else {
      fetchContacts();
    }
  }, [router]);
  
  const fetchContacts = async () => {
    setLoading(true);
    try {
        const response = await getContacts();
        dispatch(setContacts(response.data));
        setContactCount(response.data.length);
    } catch (error: any) {
        console.error('Error fetching contacts:', error.message);
    } finally {
        setLoading(false);
    }
};

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };


  const handleSubCommentClick = (contactId: number) => {

    setExpandedContacts((prevExpandedContacts) => {
      if (prevExpandedContacts.includes(contactId)) {
        return prevExpandedContacts.filter((id) => id !== contactId);
      } else {
        return [...prevExpandedContacts, contactId];
      }
    });
  };

  const handleDelete = async (contactId: number) => {
    try {
        const token = localStorage.getItem('accessToken') ?? '';
        //@ts-ignore
        await deleteContact(contactId, token);
        const response = await getContacts();
        dispatch(setContacts(response.data));
        setSelectedContact(null);
    } catch (error: any) {
        console.error('Error deleting contact:', error.message);
    }
};
  

  if (loading) {
    return <div className="flex justify-center items-center text-3xl h-screen">Loading...</div>; 
   
}

  return (
    <div>
        <div className="flex justify-center text-3xl font-bold m-3">
        Total Contacts: {contactCount}
      </div>
    <div className="flex justify-center gap-5 flex-row flex-wrap container mx-auto mt-5">

    {contacts.map((contact) => (
      <div key={contact.id} className=" mb-4 p-4 border-4 border-gray-900
      bg-slate-200 w-80 md:max-w-xl md:w-auto rounded max-sm:w-full max-sm:mx-3">
        <div

          onClick={() => handleContactClick(contact)}
          className="cursor-pointer text-blue-950 font-bold text-xl "
        >
          {contact.name}'s Contact
        </div>

        <button
          onClick={() => handleSubCommentClick(contact.id)}
          className=" text-gray-950 mt-1 text-lg"
        >
          {expandedContacts.includes(contact.id) ? 'Hide contacts' : 'click above to see the contact'}
        </button>
        {selectedContact === contact && (
          <div className="mt-2 text-xl">
            <p>
              <span className="font-bold">Name:</span> {contact.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {contact.email}
            </p>
            <p>
              <span className="font-bold">Reason:</span> {contact.reason}
            </p>
            <p>
              <span className="font-bold">Statement:</span> {contact.statement}
            </p>

            <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete Contact
                </button> 
          </div>
        )}

        {expandedContacts.includes(contact.id) && (
          <div className="mt-2">
            {contact.subComments?.map((subComment: Contact) => (
              <div key={subComment.id}>
                <p>
                  <span className="font-semibold">Name:</span> {subComment.name}
                </p>

                <p>
                  <span className="font-semibold">Email:</span> {subComment.email}
                </p>

                <p>
                <span className="font-semibold">Reason:</span> {contact.reason}
               </p>

              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
  </div>
);
};

export default Contact1;
