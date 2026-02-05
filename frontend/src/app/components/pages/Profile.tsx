import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Avatar, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { PencilIcon, ShareIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate("/");
    return null;
  }

  return (
    <div className='min-h-screen bg-foreground py-8 px-4'>
      <div className='max-w-7xl mx-auto flex gap-6'>
        <Card className='w-full max-w-sm'>
          <CardHeader className='relative h-32 bg-linear-to-r from-background to-primary'>
            <div className='absolute -bottom-16 left-1/2 -translate-x-1/2'>
              <div className='relative'>
                <Avatar
                  icon={<UserCircleIcon className='w-20 h-20' />}
                  className='w-32 h-32 text-large border-4 border-white'
                  color='default'
                />
                <button className='absolute bottom-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition'>
                  <PencilIcon className='w-4 h-4' />
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody className='pt-20 pb-6 px-6 text-center'>
            <h2 className='text-2xl font-bold mb-1 text-black'>{user.username}</h2>

            {user.displayName && <p className='text-gray-600 mb-4'>{user.displayName}</p>}

            {user.description && <p className='text-sm text-gray-500 mb-6 px-4'>{user.description}</p>}

            <div className='space-y-3 mt-6'>
              <Button color='primary' fullWidth startContent={<PencilIcon className='w-4 h-4' />}>
                Editar Perfil
              </Button>

              <Button variant='bordered' className="text-black" fullWidth startContent={<ShareIcon className='w-4 h-4' />}>
                Compartir Perfil
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className='flex-1'>
          <CardBody className='p-6'>
            <div className='flex items-center justify-center h-96 text-gray-400'>
              <p>Contenido próximamente...</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
