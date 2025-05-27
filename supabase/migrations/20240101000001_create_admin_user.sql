
-- Create a function to create admin user
CREATE OR REPLACE FUNCTION create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Check if admin user already exists
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'admin@araraquara.sp.gov.br';
    
    -- If user doesn't exist, create it
    IF admin_user_id IS NULL THEN
        -- Insert into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            invited_at,
            confirmation_token,
            confirmation_sent_at,
            recovery_token,
            recovery_sent_at,
            email_change_token_new,
            email_change,
            email_change_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            created_at,
            updated_at,
            phone,
            phone_confirmed_at,
            phone_change,
            phone_change_token,
            phone_change_sent_at,
            email_change_token_current,
            email_change_confirm_status,
            banned_until,
            reauthentication_token,
            reauthentication_sent_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@araraquara.sp.gov.br',
            crypt('admin123456', gen_salt('bf')), -- Password: admin123456
            NOW(),
            NOW(),
            '',
            NOW(),
            '',
            NULL,
            '',
            '',
            NULL,
            NULL,
            '{"provider":"email","providers":["email"]}',
            '{"name":"Administrador do Sistema"}',
            FALSE,
            NOW(),
            NOW(),
            NULL,
            NULL,
            '',
            '',
            NULL,
            '',
            0,
            NULL,
            '',
            NULL
        ) RETURNING id INTO admin_user_id;
        
        -- The profile will be created automatically by the trigger
        -- Now update the profile with admin data
        UPDATE profiles 
        SET 
            name = 'Administrador do Sistema',
            cpf = '000.000.000-00',
            phone = '(16) 99999-9999',
            address = 'Secretaria Municipal de Educação - Araraquara/SP',
            registration = 'ADM001',
            active = true
        WHERE id = admin_user_id;
        
        -- Create super admin role for all operations
        INSERT INTO user_school_roles (user_id, school_id, role, active)
        SELECT admin_user_id, NULL, 'super_admin', true;
        
        RAISE NOTICE 'Admin user created successfully with email: admin@araraquara.sp.gov.br and password: admin123456';
    ELSE
        RAISE NOTICE 'Admin user already exists';
    END IF;
END;
$$;

-- Execute the function
SELECT create_admin_user();

-- Drop the function after use
DROP FUNCTION create_admin_user();
