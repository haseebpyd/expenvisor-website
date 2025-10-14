import { adminDb } from "./firebase-admin";

export type Role = "super_admin" | "support" | "finance";

export interface AdminUser {
  email: string;
  role: Role;
  name: string;
  createdAt: Date;
  lastLogin: Date;
}

export async function checkAdminRole(
  email: string,
  requiredRole: Role
): Promise<boolean> {
  try {
    const adminDoc = await adminDb.collection("admins").doc(email).get();
    if (!adminDoc.exists) return false;

    const adminData = adminDoc.data() as AdminUser;
    const roleHierarchy = {
      super_admin: 3,
      finance: 2,
      support: 1,
    };

    return roleHierarchy[adminData.role] >= roleHierarchy[requiredRole];
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
}

export async function getAdminUser(email: string): Promise<AdminUser | null> {
  try {
    const adminDoc = await adminDb.collection("admins").doc(email).get();
    if (!adminDoc.exists) return null;

    return adminDoc.data() as AdminUser;
  } catch (error) {
    console.error("Error getting admin user:", error);
    return null;
  }
}

export async function isAdminEmail(email: string): Promise<boolean> {
  try {
    const adminDoc = await adminDb.collection("admins").doc(email).get();
    return adminDoc.exists;
  } catch (error) {
    console.error("Error checking admin email:", error);
    return false;
  }
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const roleHierarchy = {
    super_admin: 3,
    finance: 2,
    support: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
