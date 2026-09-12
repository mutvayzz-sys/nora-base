import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/router";
import { REMOTE_HOST_TRANSLATIONS } from "./remoteHostTranslations";

export const LOCALES = ["en", "es", "fr", "zh-Hans", "zh-Hant"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const ADMIN_BASE_PATH = "/admin";
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Espanol",
  fr: "Francais",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

const TRANSLATIONS = {
  es: {
    ...REMOTE_HOST_TRANSLATIONS.es,
    "Nora Admin": "Admin de Nora",
    "Full platform control": "Control total de la plataforma",
    Overview: "Resumen",
    Fleet: "Flota",
    Queue: "Cola",
    Users: "Usuarios",
    "Agent Hub": "Centro de agentes",
    Audit: "Auditoria",
    Settings: "Configuracion",
    Guardrail: "Regla de seguridad",
    "Log Out": "Cerrar sesion",
    "Admin access check failed": "Fallo la comprobacion de acceso admin",
    "Checking admin access...": "Comprobando acceso admin...",
    "System Critical": "Sistema critico",
    "System Warning": "Advertencia del sistema",
    "Upgrade Required": "Actualizacion requerida",
    "New Nora Version Available": "Nueva version de Nora disponible",
    "A newer Nora release is available": "Hay una version mas reciente de Nora disponible",
    "Review upgrade": "Revisar actualizacion",
    "Release notes": "Notas de version",
    "Platform Overview": "Resumen de plataforma",
    "Admin control plane": "Plano de control admin",
    "Queue health": "Salud de la cola",
    "Attention now": "Atencion ahora",
    "Global agent fleet": "Flota global de agentes",
    "Runtime metadata": "Metadatos del runtime",
    "Live runtime logs": "Registros en vivo del runtime",
    "Deployment queue and DLQ": "Cola de despliegue y DLQ",
    "Queued deploy jobs": "Trabajos de despliegue en cola",
    "Accounts and roles": "Cuentas y roles",
    "Agent Hub moderation": "Moderacion de Agent Hub",
    "Template Files": "Archivos de plantilla",
    "Approve listing": "Aprobar listado",
    Approve: "Aprobar",
    Published: "Publicado",
    "Platform activity log": "Registro de actividad de la plataforma",
    "Platform Settings": "Configuracion de plataforma",
    "Total Users": "Usuarios totales",
    "Total Agents": "Agentes totales",
    "Live Agents": "Agentes activos",
    "Queue Pressure": "Presion de cola",
    "Open queue": "Abrir cola",
    Refresh: "Actualizar",
    Waiting: "En espera",
    Active: "Activo",
    Completed: "Completado",
    Failed: "Fallido",
    "Warning agents": "Agentes con advertencias",
    "Error agents": "Agentes con errores",
    "Pending listings": "Listados pendientes",
    "Recent platform activity": "Actividad reciente de la plataforma",
    "This admin page doesn't exist.": "Esta pagina admin no existe.",
    "Back to Admin": "Volver a admin",
    Unversioned: "Sin version",
    "Unversioned build": "Build sin version",
    "Review the upgrade guidance to choose one-click or manual upgrade.":
      "Revisa la guia de actualizacion para elegir actualizacion de un clic o manual.",
    Members: "Miembros",
    "Multi-tenant RBAC": "RBAC multi-tenant",
    "Read-only god view of every workspace, member, and role on this Nora installation.":
      "Vista global de solo lectura de cada espacio de trabajo, miembro y rol de esta instalacion de Nora.",
    "Membership rows": "Filas de membresia",
    "Distinct users": "Usuarios distintos",
    "All workspaces": "Todos los espacios",
    "All roles": "Todos los roles",
    Workspace: "Espacio de trabajo",
    User: "Usuario",
    Role: "Rol",
    Joined: "Se unio",
    Owner: "Propietario",
    Editor: "Editor",
    Viewer: "Espectador",
    "Top role": "Rol superior",
    "Platform role": "Rol de plataforma",
    "Platform admin": "Admin de plataforma",
    Manage: "Gestionar",
    Creator: "Creador",
    "Search by user, email, or workspace…": "Buscar por usuario, correo o espacio de trabajo…",
    "No members match.": "Ningun miembro coincide.",
    by: "por",
    "Notifications (SMTP)": "Notificaciones (SMTP)",
    "One platform-wide SMTP config drives invitation emails and the email channel for alert rules.":
      "Una configuracion SMTP global impulsa los correos de invitacion y el canal de email de las reglas de alerta.",
    Configured: "Configurado",
    "Not configured": "Sin configurar",
    "SMTP host": "Servidor SMTP",
    Port: "Puerto",
    Username: "Usuario",
    Password: "Contrasena",
    "From address": "Direccion remitente",
    "From name": "Nombre remitente",
    "Use TLS (auto-on for port 465)": "Usar TLS (automatico en puerto 465)",
    "Save SMTP settings": "Guardar configuracion SMTP",
    "Send test email to me": "Enviarme un correo de prueba",
    "SMTP settings saved": "Configuracion SMTP guardada",
    "Test email sent": "Correo de prueba enviado",
    "Test email failed": "Fallo el correo de prueba",
    "Failed to load SMTP settings": "No se pudo cargar la configuracion SMTP",
    "Leave blank to keep": "Dejar vacio para conservar",
    "Save SMTP settings first": "Guarda primero la configuracion SMTP",

    "Failed to load users": "No se pudieron cargar los usuarios",
    "Failed to update role": "No se pudo actualizar el rol",
    "Role updated": "Rol actualizado",
    Delete: "Eliminar",
    "This will remove the account and clean up owned agents.":
      "Esto eliminara la cuenta y limpiara los agentes propios.",
    "Failed to delete user": "No se pudo eliminar el usuario",
    "User deleted": "Usuario eliminado",
    "Failed to update agent cap": "No se pudo actualizar el limite de agentes",
    "Agent cap override cleared": "Anulacion del limite de agentes eliminada",
    "Agent cap updated": "Limite de agentes actualizado",
    "Enter an agent cap or clear the override":
      "Introduce un limite de agentes o elimina la anulacion",
    "Agent cap must be a whole number that is 0 or greater":
      "El limite de agentes debe ser un numero entero mayor o igual que 0",
    "Backup limits must be whole numbers that are 0 or greater":
      "Los limites de copia deben ser numeros enteros mayores o iguales que 0",
    "Failed to update backup limits": "No se pudieron actualizar los limites de copia",
    "Backup limits updated": "Limites de copia actualizados",
    "User Admin": "Admin de usuarios",
    "Search the user base, adjust admin privileges, and cleanly remove accounts that own agent infrastructure.":
      "Busca en la base de usuarios, ajusta privilegios de admin y elimina con limpieza las cuentas que poseen infraestructura de agentes.",
    "All registered accounts": "Todas las cuentas registradas",
    Admins: "Admins",
    "Full-admin staff accounts": "Cuentas de personal con admin completo",
    "Standard Users": "Usuarios estandar",
    "Non-admin customer accounts": "Cuentas de cliente no admin",
    "Owned Agents": "Agentes propios",
    "Agents attached to user accounts": "Agentes vinculados a cuentas de usuario",
    "Search by email, name, or user id": "Buscar por correo, nombre o id de usuario",
    "No users match the current filters.": "Ningun usuario coincide con los filtros actuales.",
    Agents: "Agentes",
    "Agent Cap": "Limite de agentes",
    Backups: "Copias",
    Created: "Creado",
    Actions: "Acciones",
    user: "usuario",
    admin: "admin",
    "Last admin cannot be demoted.": "El ultimo admin no se puede degradar.",
    "Self-hosted": "Autohospedado",
    Free: "Gratis",
    Unlimited: "Ilimitado",
    "Admin override": "Anulacion de admin",
    "Admin default": "Valor predeterminado de admin",
    "Default user cap": "Limite de usuario predeterminado",
    "Leave blank to restore the admin default of unlimited.":
      "Deja en blanco para restaurar el valor predeterminado de admin: ilimitado.",
    "Leave blank to use the default cap of": "Deja en blanco para usar el limite predeterminado de",
    "Leave blank to use the default cap.": "Deja en blanco para usar el limite predeterminado.",
    "Default cap:": "Limite predeterminado:",
    "Unlimited default": "Predeterminado ilimitado",
    "Use default": "Usar predeterminado",
    Save: "Guardar",
    Clear: "Borrar",
    Disabled: "Desactivado",
    unlimited: "ilimitado",
    "per agent": "por agente",
    "Plan/default": "Plan/predeterminado",
    "Plan default": "Predeterminado del plan",
    Enabled: "Activado",
    Count: "Cantidad",
    "Storage MB": "Almacenamiento MB",
    "Retention days": "Dias de retencion",
    "Save backups": "Guardar copias",
  },
  fr: {
    ...REMOTE_HOST_TRANSLATIONS.fr,
    "Nora Admin": "Admin Nora",
    "Full platform control": "Controle complet de la plateforme",
    Overview: "Vue d'ensemble",
    Fleet: "Flotte",
    Queue: "File",
    Users: "Utilisateurs",
    "Agent Hub": "Centre d'agents",
    Audit: "Audit",
    Settings: "Parametres",
    Guardrail: "Garde-fou",
    "Log Out": "Deconnexion",
    "Admin access check failed": "Echec de la verification d'acces admin",
    "Checking admin access...": "Verification de l'acces admin...",
    "System Critical": "Systeme critique",
    "System Warning": "Avertissement systeme",
    "Upgrade Required": "Mise a niveau requise",
    "New Nora Version Available": "Nouvelle version de Nora disponible",
    "A newer Nora release is available": "Une version plus recente de Nora est disponible",
    "Review upgrade": "Verifier la mise a niveau",
    "Release notes": "Notes de version",
    "Platform Overview": "Vue d'ensemble de la plateforme",
    "Admin control plane": "Plan de controle admin",
    "Queue health": "Sante de la file",
    "Attention now": "Attention maintenant",
    "Global agent fleet": "Flotte globale d'agents",
    "Runtime metadata": "Metadonnees runtime",
    "Live runtime logs": "Journaux runtime en direct",
    "Deployment queue and DLQ": "File de deploiement et DLQ",
    "Queued deploy jobs": "Taches de deploiement en file",
    "Accounts and roles": "Comptes et roles",
    "Agent Hub moderation": "Moderation Agent Hub",
    "Template Files": "Fichiers du modele",
    "Approve listing": "Approuver la fiche",
    Approve: "Approuver",
    Published: "Publie",
    "Platform activity log": "Journal d'activite plateforme",
    "Platform Settings": "Parametres de plateforme",
    "Total Users": "Utilisateurs totaux",
    "Total Agents": "Agents totaux",
    "Live Agents": "Agents actifs",
    "Queue Pressure": "Pression de la file",
    "Open queue": "Ouvrir la file",
    Refresh: "Actualiser",
    Waiting: "En attente",
    Active: "Actif",
    Completed: "Termine",
    Failed: "Echec",
    "Warning agents": "Agents avec avertissements",
    "Error agents": "Agents en erreur",
    "Pending listings": "Fiches en attente",
    "Recent platform activity": "Activite recente de la plateforme",
    "This admin page doesn't exist.": "Cette page admin n'existe pas.",
    "Back to Admin": "Retour a l'admin",
    Unversioned: "Sans version",
    "Unversioned build": "Build sans version",
    "Review the upgrade guidance to choose one-click or manual upgrade.":
      "Consultez les consignes de mise a niveau pour choisir l'option en un clic ou manuelle.",
    Members: "Membres",
    "Multi-tenant RBAC": "RBAC multi-locataires",
    "Read-only god view of every workspace, member, and role on this Nora installation.":
      "Vue globale en lecture seule de chaque espace, membre et role de cette installation Nora.",
    "Membership rows": "Lignes d'adhesion",
    "Distinct users": "Utilisateurs distincts",
    "All workspaces": "Tous les espaces",
    "All roles": "Tous les roles",
    Workspace: "Espace",
    User: "Utilisateur",
    Role: "Role",
    Joined: "Rejoint",
    Owner: "Proprietaire",
    Editor: "Editeur",
    Viewer: "Spectateur",
    "Top role": "Role principal",
    "Platform role": "Role plateforme",
    "Platform admin": "Admin plateforme",
    Manage: "Gerer",
    Creator: "Createur",
    "Search by user, email, or workspace…": "Rechercher par utilisateur, email ou espace…",
    "No members match.": "Aucun membre ne correspond.",
    by: "par",
    "Notifications (SMTP)": "Notifications (SMTP)",
    "One platform-wide SMTP config drives invitation emails and the email channel for alert rules.":
      "Une configuration SMTP unique alimente les emails d'invitation et le canal email des regles d'alerte.",
    Configured: "Configure",
    "Not configured": "Non configure",
    "SMTP host": "Serveur SMTP",
    Port: "Port",
    Username: "Utilisateur",
    Password: "Mot de passe",
    "From address": "Adresse d'expediteur",
    "From name": "Nom d'expediteur",
    "Use TLS (auto-on for port 465)": "Utiliser TLS (auto pour le port 465)",
    "Save SMTP settings": "Enregistrer la configuration SMTP",
    "Send test email to me": "M'envoyer un email de test",
    "SMTP settings saved": "Configuration SMTP enregistree",
    "Test email sent": "Email de test envoye",
    "Test email failed": "Echec de l'email de test",
    "Failed to load SMTP settings": "Echec du chargement SMTP",
    "Leave blank to keep": "Laisser vide pour conserver",
    "Save SMTP settings first": "Enregistrez d'abord la configuration SMTP",

    "Failed to load users": "Echec du chargement des utilisateurs",
    "Failed to update role": "Echec de la mise a jour du role",
    "Role updated": "Role mis a jour",
    Delete: "Supprimer",
    "This will remove the account and clean up owned agents.":
      "Cela supprimera le compte et nettoiera les agents possedes.",
    "Failed to delete user": "Echec de la suppression de l'utilisateur",
    "User deleted": "Utilisateur supprime",
    "Failed to update agent cap": "Echec de la mise a jour de la limite d'agents",
    "Agent cap override cleared": "Remplacement de limite d'agents efface",
    "Agent cap updated": "Limite d'agents mise a jour",
    "Enter an agent cap or clear the override":
      "Saisissez une limite d'agents ou effacez le remplacement",
    "Agent cap must be a whole number that is 0 or greater":
      "La limite d'agents doit etre un entier superieur ou egal a 0",
    "Backup limits must be whole numbers that are 0 or greater":
      "Les limites de sauvegarde doivent etre des entiers superieurs ou egaux a 0",
    "Failed to update backup limits": "Echec de la mise a jour des limites de sauvegarde",
    "Backup limits updated": "Limites de sauvegarde mises a jour",
    "User Admin": "Admin utilisateurs",
    "Search the user base, adjust admin privileges, and cleanly remove accounts that own agent infrastructure.":
      "Recherchez dans la base utilisateurs, ajustez les privileges admin et supprimez proprement les comptes qui possedent une infrastructure d'agents.",
    "All registered accounts": "Tous les comptes enregistres",
    Admins: "Admins",
    "Full-admin staff accounts": "Comptes du personnel admin complet",
    "Standard Users": "Utilisateurs standard",
    "Non-admin customer accounts": "Comptes clients non admin",
    "Owned Agents": "Agents possedes",
    "Agents attached to user accounts": "Agents rattaches aux comptes utilisateurs",
    "Search by email, name, or user id": "Rechercher par e-mail, nom ou id utilisateur",
    "No users match the current filters.": "Aucun utilisateur ne correspond aux filtres actuels.",
    Agents: "Agents",
    "Agent Cap": "Limite d'agents",
    Backups: "Sauvegardes",
    Created: "Cree",
    Actions: "Actions",
    user: "utilisateur",
    admin: "admin",
    "Last admin cannot be demoted.": "Le dernier admin ne peut pas etre retrograde.",
    "Self-hosted": "Auto-heberge",
    Free: "Gratuit",
    Unlimited: "Illimite",
    "Admin override": "Remplacement admin",
    "Admin default": "Defaut admin",
    "Default user cap": "Limite utilisateur par defaut",
    "Leave blank to restore the admin default of unlimited.":
      "Laissez vide pour restaurer le defaut admin : illimite.",
    "Leave blank to use the default cap of": "Laissez vide pour utiliser la limite par defaut de",
    "Leave blank to use the default cap.": "Laissez vide pour utiliser la limite par defaut.",
    "Default cap:": "Limite par defaut :",
    "Unlimited default": "Defaut illimite",
    "Use default": "Utiliser le defaut",
    Save: "Enregistrer",
    Clear: "Effacer",
    Disabled: "Desactive",
    unlimited: "illimite",
    "per agent": "par agent",
    "Plan/default": "Plan/defaut",
    "Plan default": "Defaut du plan",
    Enabled: "Active",
    Count: "Nombre",
    "Storage MB": "Stockage Mo",
    "Retention days": "Jours de retention",
    "Save backups": "Enregistrer les sauvegardes",
  },
  "zh-Hans": {
    ...REMOTE_HOST_TRANSLATIONS["zh-Hans"],
    "Nora Admin": "Nora 管理",
    "Full platform control": "完整平台控制",
    Overview: "概览",
    Fleet: "队伍",
    Queue: "队列",
    Users: "用户",
    "Agent Hub": "代理中心",
    Audit: "审计",
    Settings: "设置",
    Guardrail: "防护栏",
    "Log Out": "退出登录",
    "Admin access check failed": "管理员访问检查失败",
    "Checking admin access...": "正在检查管理员访问权限...",
    "System Critical": "系统严重",
    "System Warning": "系统警告",
    "Upgrade Required": "需要升级",
    "New Nora Version Available": "有新的 Nora 版本可用",
    "A newer Nora release is available": "有更新的 Nora 版本可用",
    "Review upgrade": "查看升级",
    "Release notes": "发行说明",
    "Platform Overview": "平台概览",
    "Admin control plane": "管理员控制平面",
    "Queue health": "队列健康",
    "Attention now": "当前关注",
    "Global agent fleet": "全局代理队伍",
    "Runtime metadata": "运行时元数据",
    "Live runtime logs": "实时运行时日志",
    "Deployment queue and DLQ": "部署队列和死信队列",
    "Queued deploy jobs": "排队的部署作业",
    "Accounts and roles": "账户和角色",
    "Agent Hub moderation": "Agent Hub 审核",
    "Template Files": "模板文件",
    "Approve listing": "批准列表项",
    Approve: "批准",
    Published: "已发布",
    "Platform activity log": "平台活动日志",
    "Platform Settings": "平台设置",
    "Total Users": "用户总数",
    "Total Agents": "代理总数",
    "Live Agents": "在线代理",
    "Queue Pressure": "队列压力",
    "Open queue": "打开队列",
    Refresh: "刷新",
    Waiting: "等待中",
    Active: "活动",
    Completed: "已完成",
    Failed: "失败",
    "Warning agents": "警告代理",
    "Error agents": "错误代理",
    "Pending listings": "待处理列表",
    "Recent platform activity": "近期平台活动",
    "This admin page doesn't exist.": "此管理页面不存在。",
    "Back to Admin": "返回管理",
    Unversioned: "无版本",
    "Unversioned build": "无版本构建",
    "Review the upgrade guidance to choose one-click or manual upgrade.":
      "查看升级指南，以选择一键升级或手动升级。",
    Members: "成员",
    "Multi-tenant RBAC": "多租户 RBAC",
    "Read-only god view of every workspace, member, and role on this Nora installation.":
      "对此 Nora 安装中每个工作区、成员和角色的只读全局视图。",
    "Membership rows": "成员资格行",
    "Distinct users": "不同用户",
    "All workspaces": "所有工作区",
    "All roles": "所有角色",
    Workspace: "工作区",
    User: "用户",
    Role: "角色",
    Joined: "加入时间",
    Owner: "所有者",
    Editor: "编辑者",
    Viewer: "查看者",
    "Top role": "最高角色",
    "Platform role": "平台角色",
    "Platform admin": "平台管理员",
    Manage: "管理",
    Creator: "创建者",
    "Search by user, email, or workspace…": "按用户、邮箱或工作区搜索…",
    "No members match.": "没有匹配的成员。",
    by: "由",
    "Notifications (SMTP)": "通知 (SMTP)",
    "One platform-wide SMTP config drives invitation emails and the email channel for alert rules.":
      "一份全平台 SMTP 配置同时驱动邀请邮件和告警规则的邮件渠道。",
    Configured: "已配置",
    "Not configured": "未配置",
    "SMTP host": "SMTP 主机",
    Port: "端口",
    Username: "用户名",
    Password: "密码",
    "From address": "发件地址",
    "From name": "发件人名称",
    "Use TLS (auto-on for port 465)": "启用 TLS (端口 465 自动开启)",
    "Save SMTP settings": "保存 SMTP 设置",
    "Send test email to me": "发送测试邮件给我",
    "SMTP settings saved": "SMTP 设置已保存",
    "Test email sent": "测试邮件已发送",
    "Test email failed": "测试邮件失败",
    "Failed to load SMTP settings": "加载 SMTP 设置失败",
    "Leave blank to keep": "留空以保留",
    "Save SMTP settings first": "请先保存 SMTP 设置",

    "Failed to load users": "加载用户失败",
    "Failed to update role": "更新角色失败",
    "Role updated": "角色已更新",
    Delete: "删除",
    "This will remove the account and clean up owned agents.": "这将删除该账户并清理其拥有的代理。",
    "Failed to delete user": "删除用户失败",
    "User deleted": "用户已删除",
    "Failed to update agent cap": "更新代理上限失败",
    "Agent cap override cleared": "已清除代理上限覆盖",
    "Agent cap updated": "代理上限已更新",
    "Enter an agent cap or clear the override": "请输入代理上限或清除覆盖",
    "Agent cap must be a whole number that is 0 or greater": "代理上限必须是大于或等于 0 的整数",
    "Backup limits must be whole numbers that are 0 or greater":
      "备份限制必须是大于或等于 0 的整数",
    "Failed to update backup limits": "更新备份限制失败",
    "Backup limits updated": "备份限制已更新",
    "User Admin": "用户管理",
    "Search the user base, adjust admin privileges, and cleanly remove accounts that own agent infrastructure.":
      "搜索用户库、调整管理员权限，并干净地移除拥有代理基础设施的账户。",
    "All registered accounts": "所有已注册账户",
    Admins: "管理员",
    "Full-admin staff accounts": "完整管理员员工账户",
    "Standard Users": "标准用户",
    "Non-admin customer accounts": "非管理员客户账户",
    "Owned Agents": "拥有的代理",
    "Agents attached to user accounts": "关联到用户账户的代理",
    "Search by email, name, or user id": "按邮箱、姓名或用户 ID 搜索",
    "No users match the current filters.": "没有用户匹配当前筛选条件。",
    Agents: "代理",
    "Agent Cap": "代理上限",
    Backups: "备份",
    Created: "创建时间",
    Actions: "操作",
    user: "用户",
    admin: "管理员",
    "Last admin cannot be demoted.": "无法降级最后一名管理员。",
    "Self-hosted": "自托管",
    Free: "免费",
    Unlimited: "无限制",
    "Admin override": "管理员覆盖",
    "Admin default": "管理员默认",
    "Default user cap": "默认用户上限",
    "Leave blank to restore the admin default of unlimited.": "留空以恢复管理员默认值：无限制。",
    "Leave blank to use the default cap of": "留空以使用默认上限",
    "Leave blank to use the default cap.": "留空以使用默认上限。",
    "Default cap:": "默认上限：",
    "Unlimited default": "默认无限制",
    "Use default": "使用默认",
    Save: "保存",
    Clear: "清除",
    Disabled: "已禁用",
    unlimited: "无限制",
    "per agent": "每个代理",
    "Plan/default": "套餐/默认",
    "Plan default": "套餐默认",
    Enabled: "已启用",
    Count: "数量",
    "Storage MB": "存储 MB",
    "Retention days": "保留天数",
    "Save backups": "保存备份",
  },
  "zh-Hant": {
    ...REMOTE_HOST_TRANSLATIONS["zh-Hant"],
    "Nora Admin": "Nora 管理",
    "Full platform control": "完整平台控制",
    Overview: "概覽",
    Fleet: "隊伍",
    Queue: "佇列",
    Users: "使用者",
    "Agent Hub": "代理中心",
    Audit: "稽核",
    Settings: "設定",
    Guardrail: "防護欄",
    "Log Out": "登出",
    "Admin access check failed": "管理員存取檢查失敗",
    "Checking admin access...": "正在檢查管理員存取權限...",
    "System Critical": "系統嚴重",
    "System Warning": "系統警告",
    "Upgrade Required": "需要升級",
    "New Nora Version Available": "有新的 Nora 版本可用",
    "A newer Nora release is available": "有更新的 Nora 版本可用",
    "Review upgrade": "查看升級",
    "Release notes": "發行說明",
    "Platform Overview": "平台概覽",
    "Admin control plane": "管理員控制平面",
    "Queue health": "佇列健康",
    "Attention now": "目前關注",
    "Global agent fleet": "全域代理隊伍",
    "Runtime metadata": "執行階段中繼資料",
    "Live runtime logs": "即時執行階段日誌",
    "Deployment queue and DLQ": "部署佇列和死信佇列",
    "Queued deploy jobs": "排入佇列的部署作業",
    "Accounts and roles": "帳戶和角色",
    "Agent Hub moderation": "Agent Hub 審核",
    "Template Files": "範本檔案",
    "Approve listing": "核准列表項目",
    Approve: "核准",
    Published: "已發布",
    "Platform activity log": "平台活動日誌",
    "Platform Settings": "平台設定",
    "Total Users": "使用者總數",
    "Total Agents": "代理總數",
    "Live Agents": "線上代理",
    "Queue Pressure": "佇列壓力",
    "Open queue": "開啟佇列",
    Refresh: "重新整理",
    Waiting: "等待中",
    Active: "啟用",
    Completed: "已完成",
    Failed: "失敗",
    "Warning agents": "警告代理",
    "Error agents": "錯誤代理",
    "Pending listings": "待處理列表",
    "Recent platform activity": "近期平台活動",
    "This admin page doesn't exist.": "此管理頁面不存在。",
    "Back to Admin": "返回管理",
    Unversioned: "無版本",
    "Unversioned build": "無版本建置",
    "Review the upgrade guidance to choose one-click or manual upgrade.":
      "查看升級指南，以選擇一鍵升級或手動升級。",
    Members: "成員",
    "Multi-tenant RBAC": "多租戶 RBAC",
    "Read-only god view of every workspace, member, and role on this Nora installation.":
      "對此 Nora 安裝中每個工作區、成員和角色的唯讀全域檢視。",
    "Membership rows": "成員資格列",
    "Distinct users": "不同使用者",
    "All workspaces": "所有工作區",
    "All roles": "所有角色",
    Workspace: "工作區",
    User: "使用者",
    Role: "角色",
    Joined: "加入時間",
    Owner: "擁有者",
    Editor: "編輯者",
    Viewer: "檢視者",
    "Top role": "最高角色",
    "Platform role": "平台角色",
    "Platform admin": "平台管理員",
    Manage: "管理",
    Creator: "建立者",
    "Search by user, email, or workspace…": "依使用者、電子郵件或工作區搜尋…",
    "No members match.": "沒有符合的成員。",
    by: "由",
    "Notifications (SMTP)": "通知 (SMTP)",
    "One platform-wide SMTP config drives invitation emails and the email channel for alert rules.":
      "單一平台 SMTP 設定同時驅動邀請郵件和告警規則的郵件通道。",
    Configured: "已設定",
    "Not configured": "未設定",
    "SMTP host": "SMTP 主機",
    Port: "連接埠",
    Username: "使用者名稱",
    Password: "密碼",
    "From address": "寄件地址",
    "From name": "寄件人名稱",
    "Use TLS (auto-on for port 465)": "啟用 TLS (連接埠 465 自動啟用)",
    "Save SMTP settings": "儲存 SMTP 設定",
    "Send test email to me": "傳送測試郵件給我",
    "SMTP settings saved": "SMTP 設定已儲存",
    "Test email sent": "測試郵件已傳送",
    "Test email failed": "測試郵件失敗",
    "Failed to load SMTP settings": "載入 SMTP 設定失敗",
    "Leave blank to keep": "留空以保留",
    "Save SMTP settings first": "請先儲存 SMTP 設定",

    "Failed to load users": "載入使用者失敗",
    "Failed to update role": "更新角色失敗",
    "Role updated": "角色已更新",
    Delete: "刪除",
    "This will remove the account and clean up owned agents.": "這會移除該帳戶並清理其擁有的代理。",
    "Failed to delete user": "刪除使用者失敗",
    "User deleted": "使用者已刪除",
    "Failed to update agent cap": "更新代理上限失敗",
    "Agent cap override cleared": "已清除代理上限覆寫",
    "Agent cap updated": "代理上限已更新",
    "Enter an agent cap or clear the override": "請輸入代理上限或清除覆寫",
    "Agent cap must be a whole number that is 0 or greater": "代理上限必須是大於或等於 0 的整數",
    "Backup limits must be whole numbers that are 0 or greater":
      "備份限制必須是大於或等於 0 的整數",
    "Failed to update backup limits": "更新備份限制失敗",
    "Backup limits updated": "備份限制已更新",
    "User Admin": "使用者管理",
    "Search the user base, adjust admin privileges, and cleanly remove accounts that own agent infrastructure.":
      "搜尋使用者庫、調整管理員權限，並乾淨地移除擁有代理基礎建設的帳戶。",
    "All registered accounts": "所有已註冊帳戶",
    Admins: "管理員",
    "Full-admin staff accounts": "完整管理員員工帳戶",
    "Standard Users": "標準使用者",
    "Non-admin customer accounts": "非管理員客戶帳戶",
    "Owned Agents": "擁有的代理",
    "Agents attached to user accounts": "關聯到使用者帳戶的代理",
    "Search by email, name, or user id": "依電子郵件、姓名或使用者 ID 搜尋",
    "No users match the current filters.": "沒有使用者符合目前篩選條件。",
    Agents: "代理",
    "Agent Cap": "代理上限",
    Backups: "備份",
    Created: "建立時間",
    Actions: "操作",
    user: "使用者",
    admin: "管理員",
    "Last admin cannot be demoted.": "無法降級最後一名管理員。",
    "Self-hosted": "自託管",
    Free: "免費",
    Unlimited: "無限制",
    "Admin override": "管理員覆寫",
    "Admin default": "管理員預設",
    "Default user cap": "預設使用者上限",
    "Leave blank to restore the admin default of unlimited.": "留空以還原管理員預設值：無限制。",
    "Leave blank to use the default cap of": "留空以使用預設上限",
    "Leave blank to use the default cap.": "留空以使用預設上限。",
    "Default cap:": "預設上限：",
    "Unlimited default": "預設無限制",
    "Use default": "使用預設",
    Save: "儲存",
    Clear: "清除",
    Disabled: "已停用",
    unlimited: "無限制",
    "per agent": "每個代理",
    "Plan/default": "方案/預設",
    "Plan default": "方案預設",
    Enabled: "已啟用",
    Count: "數量",
    "Storage MB": "儲存空間 MB",
    "Retention days": "保留天數",
    "Save backups": "儲存備份",
  },
} satisfies Record<Exclude<Locale, "en">, Record<string, string>>;

type TranslationKey =
  | keyof typeof TRANSLATIONS.es
  | keyof typeof TRANSLATIONS.fr
  | keyof (typeof TRANSLATIONS)["zh-Hans"]
  | keyof (typeof TRANSLATIONS)["zh-Hant"];

type I18nValue = {
  locale: Locale;
  defaultLocale: Locale;
  preferredLocale: Locale | null;
  t: (key: TranslationKey | string) => string;
  localizePath: (path: string, targetLocale?: Locale) => string;
  setLocale: (locale: Locale) => Promise<void>;
  clearLocalePreference: () => Promise<Locale>;
  loginPath: string;
  dashboardPath: string;
};

const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  defaultLocale: DEFAULT_LOCALE,
  preferredLocale: null,
  t: (key) => key,
  localizePath: (path) => path,
  setLocale: async () => {},
  clearLocalePreference: async () => DEFAULT_LOCALE,
  loginPath: "/login",
  dashboardPath: "/app/dashboard",
});

export function normalizeLocale(value: string | undefined): Locale {
  return LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}

function explicitLocaleFromRoute(value: string | undefined): Locale | null {
  const locale = normalizeLocale(value);
  return locale === DEFAULT_LOCALE ? null : locale;
}

function legacyAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = window.localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchLanguagePreference() {
  try {
    const userResponse = await fetch("/api/auth/me", {
      credentials: "include",
      headers: legacyAuthHeaders(),
    });
    if (userResponse.ok) {
      const user = await userResponse.json().catch(() => ({}));
      return {
        defaultLocale: normalizeLocale(user.defaultLocale),
        preferredLocale: user.preferredLocale ? normalizeLocale(user.preferredLocale) : null,
        effectiveLocale: normalizeLocale(user.effectiveLocale || user.defaultLocale),
      };
    }
  } catch {
    // Fall back to the public platform config below.
  }

  try {
    const configResponse = await fetch("/api/config/platform");
    if (configResponse.ok) {
      const config = await configResponse.json().catch(() => ({}));
      const defaultLocale = normalizeLocale(config.language?.defaultLocale);
      return { defaultLocale, preferredLocale: null, effectiveLocale: defaultLocale };
    }
  } catch {
    // Keep the built-in default if config is unavailable.
  }

  return {
    defaultLocale: DEFAULT_LOCALE,
    preferredLocale: null,
    effectiveLocale: DEFAULT_LOCALE,
  };
}

async function persistPreferredLocale(locale: Locale | null) {
  try {
    const response = await fetch("/api/auth/profile", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...legacyAuthHeaders(),
      },
      body: JSON.stringify({ preferredLocale: locale }),
    });
    if (!response.ok) return null;
    return response.json().catch(() => null);
  } catch {
    return null;
  }
}

export function translateText(value: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return value;
  return TRANSLATIONS[locale][value] || value;
}

export function hasTranslation(value: string, locale: Locale): boolean {
  return locale === DEFAULT_LOCALE || Object.hasOwn(TRANSLATIONS[locale], value);
}

export function marketingPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  const [pathname, suffix = ""] = path.split(/([?#].*)/, 2);
  return `/${locale}${pathname === "/" ? "" : pathname}${suffix}`;
}

export function operatorPath(path: string, locale: Locale): string {
  const [pathname, suffix = ""] = path.split(/([?#].*)/, 2);
  const clean = (pathname || "/").replace(/^\/app/, "") || "/";
  const withoutLocale = clean.replace(/^\/(en|es|fr|zh-Hans|zh-Hant)(?=\/|$)/, "") || "/";
  const localized =
    locale === DEFAULT_LOCALE
      ? `/app${withoutLocale === "/" ? "" : withoutLocale}`
      : `/app/${locale}${withoutLocale === "/" ? "" : withoutLocale}`;
  return `${localized}${suffix}`;
}

export function localizePath(path: string, locale: Locale): string {
  if (
    !path ||
    path.startsWith("http") ||
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("/api")
  ) {
    return path;
  }
  if (path === "/login" || path.startsWith("/login?") || path.startsWith("/pricing")) {
    return marketingPath(path, locale);
  }
  if (path.startsWith("/app")) return operatorPath(path, locale);

  const [pathname, suffix = ""] = path.split(/([?#].*)/, 2);
  const adminRelative = (pathname || "/").replace(new RegExp(`^${ADMIN_BASE_PATH}`), "") || "/";
  const withoutLocale = adminRelative.replace(/^\/(en|es|fr|zh-Hans|zh-Hant)(?=\/|$)/, "") || "/";
  const localized =
    locale === DEFAULT_LOCALE
      ? `${ADMIN_BASE_PATH}${withoutLocale === "/" ? "" : withoutLocale}`
      : `${ADMIN_BASE_PATH}/${locale}${withoutLocale === "/" ? "" : withoutLocale}`;
  return `${localized}${suffix}`;
}

function getTextNodes(root: ParentNode): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script,style,textarea,code,pre,[data-no-translate]")) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes: Text[] = [];
  let next = walker.nextNode();
  while (next) {
    nodes.push(next as Text);
    next = walker.nextNode();
  }
  return nodes;
}

const textOriginals = new WeakMap<Text, string>();
const translatedAttributes = ["aria-label", "placeholder", "title", "alt"] as const;
const REVERSE_TRANSLATIONS = Object.fromEntries(
  Object.entries(TRANSLATIONS).map(([locale, entries]) => [
    locale,
    Object.fromEntries(Object.entries(entries).map(([source, translated]) => [translated, source])),
  ]),
) as Record<Exclude<Locale, "en">, Record<string, string>>;

function sourceTextFor(value: string, locale: Locale): string {
  const trimmed = value.trim();
  if (!trimmed || locale === DEFAULT_LOCALE) return trimmed;
  return REVERSE_TRANSLATIONS[locale][trimmed] || trimmed;
}

function sourceTextWithWhitespace(value: string, locale: Locale): string {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  return `${leading}${sourceTextFor(value, locale)}${trailing}`;
}

function setAttributeIfChanged(element: Element, attr: string, value: string) {
  if (element.getAttribute(attr) !== value) element.setAttribute(attr, value);
}

function localizeElement(root: ParentNode, locale: Locale) {
  for (const node of getTextNodes(root)) {
    let original = textOriginals.get(node);
    if (!original) {
      original = sourceTextWithWhitespace(node.textContent || "", locale);
      textOriginals.set(node, original);
    }
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    const nextValue = `${leading}${translateText(original.trim(), locale)}${trailing}`;
    if (node.textContent !== nextValue) node.textContent = nextValue;
  }

  const elements =
    root instanceof Element
      ? [root, ...Array.from(root.querySelectorAll("*"))]
      : Array.from(root.querySelectorAll("*"));
  for (const element of elements) {
    if (element.closest("script,style,textarea,code,pre,[data-no-translate]")) continue;
    for (const attr of translatedAttributes) {
      const current = element.getAttribute(attr);
      if (!current) continue;
      const marker = `data-i18n-original-${attr}`;
      const original = element.getAttribute(marker) || sourceTextFor(current, locale);
      if (!element.hasAttribute(marker)) element.setAttribute(marker, original);
      setAttributeIfChanged(element, attr, translateText(original, locale));
    }
    if (element instanceof HTMLAnchorElement) {
      const currentHref = element.getAttribute("href");
      if (!currentHref) continue;
      const marker = "data-i18n-original-href";
      const originalHref = element.getAttribute(marker) || currentHref;
      if (!element.hasAttribute(marker)) element.setAttribute(marker, originalHref);
      setAttributeIfChanged(element, "href", localizePath(originalHref, locale));
    }
  }
}

function StaticLocalizer({ locale }: { locale: Locale }) {
  useEffect(() => {
    localizeElement(document.body, locale);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
              const text = node as Text;
              if (!textOriginals.has(text)) {
                textOriginals.set(text, sourceTextWithWhitespace(text.textContent || "", locale));
              }
              text.textContent = translateText((textOriginals.get(text) || "").trim(), locale);
            } else if (node instanceof Element) {
              localizeElement(node, locale);
            }
          }
        } else if (mutation.type === "attributes" && mutation.target instanceof Element) {
          localizeElement(mutation.target, locale);
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [...translatedAttributes, "href"],
    });
    return () => observer.disconnect();
  }, [locale]);
  return null;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const routeLocale = normalizeLocale(router.locale);
  const [locale, setResolvedLocale] = useState<Locale>(routeLocale);
  const [defaultLocale, setDefaultLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [preferredLocale, setPreferredLocale] = useState<Locale | null>(null);

  useEffect(() => {
    let active = true;
    const explicitLocale = explicitLocaleFromRoute(router.locale);

    async function loadPreference() {
      const preference = await fetchLanguagePreference();
      if (!active) return;

      setDefaultLocale(preference.defaultLocale);
      setPreferredLocale(preference.preferredLocale);

      const nextLocale = explicitLocale || preference.effectiveLocale;
      setResolvedLocale(nextLocale);

      if (!explicitLocale && nextLocale !== routeLocale) {
        router
          .replace(router.pathname, router.asPath, { locale: nextLocale, scroll: false })
          .catch(() => {});
      }
    }

    loadPreference();
    return () => {
      active = false;
    };
  }, [routeLocale, router.asPath, router.pathname]);

  const setLocale = useCallback(
    async (nextLocale: Locale) => {
      const normalized = normalizeLocale(nextLocale);
      const persisted = await persistPreferredLocale(normalized);
      setPreferredLocale(
        persisted?.preferredLocale ? normalizeLocale(persisted.preferredLocale) : normalized,
      );
      setDefaultLocale(normalizeLocale(persisted?.defaultLocale || defaultLocale));
      setResolvedLocale(normalized);
      await router.push(router.pathname, router.asPath, { locale: normalized });
    },
    [defaultLocale, router],
  );

  const clearLocalePreference = useCallback(async () => {
    const persisted = await persistPreferredLocale(null);
    const nextDefaultLocale = normalizeLocale(persisted?.defaultLocale || defaultLocale);
    const nextEffectiveLocale = normalizeLocale(persisted?.effectiveLocale || nextDefaultLocale);
    setPreferredLocale(null);
    setDefaultLocale(nextDefaultLocale);
    setResolvedLocale(nextEffectiveLocale);
    await router.push(router.pathname, router.asPath, { locale: nextEffectiveLocale });
    return nextEffectiveLocale;
  }, [defaultLocale, router]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      defaultLocale,
      preferredLocale,
      t: (key) => translateText(key, locale),
      localizePath: (path, targetLocale = locale) => localizePath(path, targetLocale),
      setLocale,
      clearLocalePreference,
      loginPath: marketingPath("/login", locale),
      dashboardPath: operatorPath("/app/dashboard", locale),
    }),
    [clearLocalePreference, defaultLocale, locale, preferredLocale, setLocale],
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
      <StaticLocalizer locale={locale} />
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
